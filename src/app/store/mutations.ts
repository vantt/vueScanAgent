import { ScanAction } from "@/domain/model/ScanAction";
import { ScanHistory } from "@/domain/model/ScanHistory";
import { IState} from "@/app/store/state";

export const mutations = {
    removeScanAction(state: IState, payload: { code: string }): void {
        state.scanActions = state.scanActions.filter(
            (action: ScanAction) => action.code !== payload.code
        );
    },

    saveScanAction(state: IState, payload: ScanAction): void {
        // find old action
        const index = state.scanActions.findIndex(
            (action: ScanAction) => action.code === payload.code
        );

        const action = new ScanAction(
            payload.code,
            payload.label,
            payload.link,
            payload.autoRescan
        );

        if (index !== -1) {
            // update
            state.scanActions[index] = action;
        } else {
            // add new
            state.scanActions.push(action);
        }
    },

    copyScanAction(state: IState, payload:  {code: string, newCode: string}): void {
        const index = state.scanActions.findIndex(
            (action: ScanAction) => action.code === payload.code
        );

        if (index > -1) {
            const newAction = {
                ...state.scanActions[index],
                code: payload.newCode
            } as ScanAction;

            state.scanActions.push(newAction);
        }
    },

    replaceScanActions(state: IState, scanActions: ScanAction[]): void {
        state.scanActions = scanActions;
    },

    addHistory(state: IState, scan: ScanHistory): void {
        state.scanHistories.unshift(scan);
    },
}
