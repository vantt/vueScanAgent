import { ScanAction } from "@/domain/model/ScanAction";
import { IState } from "@/app/store/state";

export const getters = {
    allScanHistories: (state: IState ) => {
        return state.scanHistories;
    },

    allScanActions: (state: IState) => {
        return state.scanActions;
    },

    getScanActionByCode: (state: IState) => (code: string): ScanAction|undefined => {
        return state.scanActions.find((action: ScanAction) => action.code === code);
    }
}