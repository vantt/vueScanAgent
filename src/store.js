import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        scanActions: [
            {code: "search", label: "Search", link: "https://www.google.com/%scanvalue%"},
        ],

        scanHistories: [
          {scanAction: "code", content: "Search", created:""},
        ]
    },

    getters: {
        allScanHistories:(state) => {
            return state.scanHistories;
        },

        allScanActions:(state) => {
            return state.scanActions;
        },

        getScanActionByCode: (state) => (code) => {
            return state.scanActions.find(action => action.code === code)
        },
    },

    mutations: {
        removeScanAction(state, payload) {
            state.scanActions = state.scanActions.filter(action => action.code !== payload.code);
        },

        updateScanAction(state, payload) {
            // find old action
            let index = state.scanActions.findIndex(action => action.code === payload.code);

            if (index !== -1) {
                // update
                state.scanActions[index] = payload;
            } else {
                // add new
                state.scanActions.push(payload);
            }
        },

        addHistory(state, scan) {
          state.scanHistories.unshift(scan);
        }
    },

    actions: {},

    plugins: [createPersistedState({key: 'scanAgent'})],
});
