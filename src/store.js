import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import defaultScanActions from "@/config/defaultScanActions.json";
//import replicator from "./core/replicator";

Vue.use(Vuex);

export function createStore() {

    let store = new Vuex.Store({
        state: () => ({
            ipfsAddress: '',
            dbAddress: '',
            scanActions: defaultScanActions,
            scanHistories: [{scanAction: "code", content: "Search", created: ""}]
        }),

        getters: {
            allScanHistories: state => {
                return state.scanHistories;
            },

            allScanActions: state => {
                return state.scanActions;
            },

            getScanActionByCode: state => (code) => {
                return state.scanActions.find(action => action.code === code);
            }
        },

        mutations: {
            removeScanAction(state, payload) {
                state.scanActions = state.scanActions.filter(
                    action => action.code !== payload.code
                );
            },

            copyScanAction(state, payload) {
                let index = state.scanActions.findIndex(
                    action => action.code === payload.code
                );

                if (index > -1) {
                    let newAction = {
                        ...state.scanActions[index],
                        ...{code: payload.newCode}
                    };
                    state.scanActions.push(newAction);
                }
            },

            updateScanAction(state, payload) {
                // find old action
                let index = state.scanActions.findIndex(
                    action => action.code === payload.originalData.code
                );
                let action = {
                    code: payload.code,
                    label: payload.label,
                    link: payload.link,
                    autoRescan: payload.autoRescan
                };

                if (index !== -1) {
                    // update
                    state.scanActions[index] = action;
                } else {
                    // add new
                    state.scanActions.push(action);
                }
            },

            replaceScanActions(state, scanActions) {
                state.scanActions = scanActions;
            },

            addHistory(state, scan) {
                state.scanHistories.unshift(scan);
            },

            setIpfsAddress(state, ipfsAddress) {
                state.ipfsAddress = ipfsAddress;
            },

            setDbAddress(state, dbAddress) {
                state.dbAddress = dbAddress;
            }
        },

        actions: {
            // async connectDb({commit}, ipfsAddress) {
            //     return new Promise((resolve, reject) => {
            //         replicator.connect(ipfsAddress).then((result) => {
            //             if (result) {
            //                 commit("setIpfsAddress", ipfsAddress);
            //             }
            //
            //             resolve(result);
            //         });
            //     });
            // },
            //
            // async createDb({commit}, dbName) {
            //     return new Promise((resolve, reject) => {
            //         replicator.createDb(dbName).then((dbAddress) => {
            //             if (dbAddress !== null) {
            //                 commit("setDbAddress", dbAddress);
            //             }
            //
            //             resolve(dbAddress);
            //         });
            //     });
            // },
            //
            // async openDb({commit}, dbAddress) {
            //     return new Promise((resolve, reject) => {
            //         replicator.openDb(dbAddress).then((result) => {
            //             commit("setDbAddress", dbAddress);
            //             this.startSync({commit});
            //             resolve(dbAddress);
            //         });
            //     });
            // },
            //
            // startSync({commit}, syncAddress) {
            //     replicator.scanActions();
            // },
        },

        plugins: [createPersistedState({key: "scanAgent"})]
    });

    // store.subscribeAction({
    //     before: (action, state) => {
    //         console.log(`before action ${action.type}`);
    //         console.log(action);
    //         console.log(state);
    //
    //         if ('startSync' === action.type) {
    //             if (state.syncAddress === null) {
    //                 replicator.create("scanAgent_" + Math.random().toString(36).substr(2, 9)).then(syncAddress => {
    //                     action.payload = syncAddress;
    //                     replicator.init(syncAddress);
    //                 });
    //             }
    //             else {
    //                 replicator.init(state.syncAddress)
    //             }
    //         }
    //     },
    //
    //     after: (action, state) => {
    //         console.log(`after action`, action, state);
    //         if ('setSyncAddress' === action.type) {
    //             replicator.init(state.syncAddress)
    //         }
    //     }
    // });
    //
    // // listen on Store change and push to central DB
    // store.subscribe((mutation, state) => {
    //     console.log(mutation.type, mutation.payload);
    //
    //     if (
    //         ["removeScanAction", "copyScanAction", "updateScanAction"].indexOf(
    //             mutation.type
    //         ) != -1
    //     ) {
    //         replicator.set({_id: 'scanActions', doc: state.scanActions});
    //     }
    // });
    //
    // // when peer changes, update to store
    // replicator.subscribe( data => store.commit('replaceScanActions', data));

    return store;
}
