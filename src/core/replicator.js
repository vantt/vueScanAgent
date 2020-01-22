
const ipfsClient = require('ipfs-http-client');
const IPFS = require("ipfs");
const OrbitDB = require("orbit-db");

// https://medium.com/tallylab/pushing-the-limits-of-ipfs-and-orbitdb-c86c8512ef2f
// Configuration for IPFS instance

function createIpfsConfig(ipfsAddress) {
    return {
        repo: "ipfs/shared",
        config: {
            "Bootstrap": [

            ],
            // Addresses: {
            //     Swarm: [
            //         // Use IPFS dev signal server
            //         ipfsAddress
            //     ],
            //     API: "/ip4/192.168.68.171/tcp/5001",
            //     Gateway: "/ip4/192.168.68.171/tcp/8080"
            // },
        },

        EXPERIMENTAL: {
            pubsub: true
        },
    };
}

// Configuration for the database
const dbConfig = {
    // If database doesn't exist, create it
    create: true,
    // Don't wait to load from the network
    sync: true,
    // Load only the local version of the database
    localOnly: true,
    // Allow anyone to write to the database,
    // otherwise only the creator of the database can write
    admin: ["*"],
    write: ["*"]
};

async function createOrbitInstance(ipfsAddress) {
    return new Promise((resolve, reject) => {
        // Create IPFS instance
        const ipfsConfig = createIpfsConfig(ipfsAddress);
        //console.log(ipfsConfig);
        const ipfs = new IPFS(ipfsConfig);
//         const ipfs = ipfsClient({ host: '192.168.68.171', port: '5001', protocol: 'http' });
//         const content = IPFS.Buffer.from('ABC');
//         const results = ipfs.add(content);
//         const hash = results[0].hash; // "Qm...WW"
// console.log(hash);

        ipfs.on("error", e => {
            console.error("Ipfs Error", e);
            return resolve(null);
        });

        ipfs.on("ready", async () => {
            try {
                const id = await ipfs.id();
                console.log("Ipfs Connected: " , id);

                const content = IPFS.Buffer.from('ABC');
                const results = await ipfs.add('tran toan van x asdf2');
                console.log(results);

                const file = await ipfs.cat("/ipfs/" + results[0].hash);
                console.log(file.toString('utf8'));

                // Create an OrbitDB instance
                const orbit = await OrbitDB.createInstance(ipfs);

                return resolve(orbit);
            } catch (e) {
                return resolve(null);
            }
        });
    });
}

export default async function createOrbitInstance2(ipfsAddress) {
    return new Promise((resolve, reject) => {
        // Create IPFS instance
        const ipfsConfig = createIpfsConfig(ipfsAddress);
        //console.log(ipfsConfig);
        const ipfs = new IPFS(ipfsConfig);
//         const ipfs = ipfsClient({ host: '192.168.68.171', port: '5001', protocol: 'http' });
//         const content = IPFS.Buffer.from('ABC');
//         const results = ipfs.add(content);
//         const hash = results[0].hash; // "Qm...WW"
// console.log(hash);

        ipfs.on("error", e => {
            console.error("Ipfs Error", e);
            return resolve(null);
        });

        ipfs.on("ready", async () => {
            try {
                const id = await ipfs.id();
                console.log("Ipfs Connected: " , id);
                resolve(ipfs);
            } catch (e) {
                return resolve(null);
            }
        });
    });
}

class Replicator {
    constructor() {
        this.dbAddress = null;
        this.ipfsAddress = null;
        this.orbitdb = null;
        this.db = null;
        this.onChange = null;
        this.ready = false;
    };

    async connect(ipfsAddress) {
        return new Promise((resolve, reject) => {
            createOrbitInstance(ipfsAddress).then(orbitdb => {
                if (null === orbitdb) {
                    console.log('replicator fail to connect');
                    resolve(false);
                } else {
                    this.orbitdb = orbitdb;
                    console.log('replicator connected');
                    resolve(true);
                }
            })
        });
    }

    async createDb(dbName) {
        console.log('createDb() ' + dbName);
        this.ready = false;
        return new Promise(async (resolve, reject) => {

            this.orbitdb.create(dbName, 'docstore', dbConfig).then(db => {
                this.replaceDb(db);
                const address = db.address.toString();
                console.log(address);
                return resolve(address);
            }).catch(reason => {
                this.orbitdb.determineAddress(dbName, 'docstore', dbConfig).then(address => resolve(this.openDb(address.toString())));
            });
        });
    };

    async openDb(dbAddress) {
        console.log('openDb() ' + dbAddress);
        this.ready = false;

        return new Promise(async (resolve, reject) => {
            this.orbitdb.open(dbAddress, dbConfig).then(db => {
                this.replaceDb(db);
                return resolve(dbAddress);
            }).catch(reason => {
                console.log(reason);
                resolve(null)
            });
        });
    }

    replaceDb(db) {
        db.load().then(result => {
            console.log('db loaded');
            this.set({_id: 'aaaaa', doc:'adsfasdfds'});
            this.inform();
        });

        // When the database was loaded and is ready to use,
        // refresh our data model and set the state to ready
        db.events.on("ready", () => {
            console.log('db ready');
            this.ready = true;
            this.inform();
        });

        // When a remote peer updated the todos, refresh our data model
        db.events.on("replicated", () => {
            console.log('db replicated');
            this.inform();
        });

        this.db = db;
    }

    subscribe(handler) {
        this.onChange = handler;
        return this;
    };

    async inform() {
        console.log('inform()');
        let data = await this.scanActions();
console.log(data);
        if (this.onChange !== null && this.onChange !== undefined) {
            this.onChange(data);
        }
    }    ;

    async set(scanActions) {
        console.log(scanActions);
        let a = await this.db.put(scanActions);
        let b = await this.db.get(scanActions._id);
        console.log(a);
        console.log(b);
        // this.inform();
    };

    async remove(scanAction) {
        await this.db.del(scanAction.code);
        this.inform();
    }    ;

    async scanActions() {
        let actions = this.db.query(doc => true);
        console.log('scanActions', actions);
        return Promise.resolve(actions || []);
    };
}

//export default new Replicator();
