import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import defaultScanActions from "@/app/config/defaultScanActions.json";
import { ScanAction } from "@/domain/model/ScanAction";
import { IState, initState } from "@/app/store/state";
import { getters } from "@/app/store/getters";
import { actions } from "@/app/store/actions";
import { mutations } from "@/app/store/mutations";

Vue.use(Vuex);

export function createStore(scanActions: ScanAction[] | null) {
    if (scanActions === null) {
        scanActions = defaultScanActions as ScanAction[]
    }

    const store = new Vuex.Store({
        state: () => ({
            ...initState,
            scanActions: scanActions,
        } as IState),

        getters,
        mutations,
        actions,
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
