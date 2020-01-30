const IPFS = require("ipfs");

// https://medium.com/tallylab/pushing-the-limits-of-ipfs-and-orbitdb-c86c8512ef2f
// Configuration for IPFS instance

function createIpfsConfig(ipfsAddress) {
    return {
        //repo: "ipfs/shared",
        config: {
            "Bootstrap": [
                '/ip4/192.168.68.171/tcp/4001/ipfs/QmWp99n3FciYt8Yi16eLZ2ooRXTwNeeQu9qmQtNkiGQBTx'
                //'/ip4/192.168.68.171/tcp/9999/ws/ipfs/QmWp99n3FciYt8Yi16eLZ2ooRXTwNeeQu9qmQtNkiGQBTx'
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

async function createIpfsInstance(ipfsAddress) {
    return new Promise((resolve, reject) => {

        // Create IPFS instance
        const ipfs = new IPFS(createIpfsConfig(ipfsAddress));

        ipfs.on("error", e => {
            console.error("Ipfs Error", e);
            return resolve(null);
        });

        ipfs.on("ready", async () => {
            try {
                const id = await ipfs.id();
                console.log("Ipfs Connected: ", id);

                return resolve(ipfs);
            } catch (e) {
                return resolve(null);
            }
        });
    });
}


class IpfsClient {
    constructor() {
        this.ipfs = null;
    };

    async connect(ipfsAddress) {
        return new Promise((resolve, reject) => {
            createIpfsInstance(ipfsAddress).then(ipfs => {
                if (null === ipfs) {
                    console.error('Client fail to connect to: ' + ipfsAddress);
                    resolve(false);
                } else {
                    this.ipfs = ipfs;
                    console.log('Client connected to: ' + ipfsAddress);
                    resolve(true);
                }
            })
        });
    }

    async set(content) {
        return new Promise(async (resolve, reject) => {
            const jsonString = JSON.stringify(content);
            this.ipfs.add(jsonString).then(async(results) => {
                console.log(results);
                const hash = '/ipfs/' + results[0].hash;
                console.log('Content Hash: ' + hash);
                const file = await this.ipfs.cat(hash);
                const data = JSON.parse(file.toString('utf8'));
                console.log(data);

                resolve(hash);
            }).catch(reason => {
                console.warn(reason);
                resolve(null);
            });
        });
    };

    async get(hash) {
        console.log(hash);
        const file = await this.ipfs.cat(hash);
        const data = JSON.parse(file.toString('utf8'));
        console.log(data);
        return data;
    };

    async del(hash) {
        return new Promise(async (resolve, reject) => {
            this.ipfs.del(hash).then((file => {
                const content = file.toString('utf8');
                console.log(content);
                resolve(content);
            })).catch(reason => {
                console.warn(reason);
                resolve(null);
            });
        });
    };
}

export default new IpfsClient();
