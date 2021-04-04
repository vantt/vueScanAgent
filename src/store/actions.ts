import { ScanAction } from "@/domain/model/ScanAction";

export const actions = {
    saveScanAction ( { commit }, payload: ScanAction): void {
        commit('saveScanAction', payload);
    },

    removeScanAction ( { commit }, payload: { code: string }): void {
        commit('removeScanAction', payload);
    },

    copyScanAction ( { commit }, payload: {code: string, newCode: string}): void {
        commit('copyScanAction', payload);
    },

    resetDefaultScanActions ( { commit }, payload: { randomSeed: string }): void {
        // this.$http.get("/config/defaultScanActions.json").then((response) => {
        //     this.$store.commit("replaceScanActions", response.data);
        //     const scanActions:ScanAction[] = [];
        //     commit('replaceScanActions', scanActions);
        // });
    },


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
}
