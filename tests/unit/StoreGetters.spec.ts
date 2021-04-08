import { getters } from '@/app/store/getters'
import { IState } from "@/app/store/state";
import { mockScanActions, mockScanAction1 } from "./fixtures/mockScanActions";
import {mockScanHistories} from "./fixtures/mockScanHistory";

describe('getters', () => {
    it('allScanActions', () => {
        // mock state
        const state: IState = {
            scanActions: mockScanActions,
            scanHistories: [],
            ipfsAddress: '',
            dbAddress: '',
        }

        // get the result from the getter
        const result = getters.allScanActions(state)

        // assert the result
        expect(result).toEqual(mockScanActions);
    })

    it('getScanActionByCode', () => {
        // mock state
        const state: IState = {
            scanActions: mockScanActions,
            scanHistories: [],
            ipfsAddress: '',
            dbAddress: '',
        }

        const code = 'test-checkin1';

        // get the result from the getter
        const result = getters.getScanActionByCode(state)(code)

        // assert the result
        expect(result).toEqual(mockScanAction1);
    })

    it('allScanHistories', () => {
    // mock state
        const state: IState = {
            scanActions: [],
            scanHistories: mockScanHistories,
            ipfsAddress: '',
            dbAddress: '',
        }

        // get the result from the getter
        const result = getters.allScanHistories(state)

        // assert the result
        expect(result).toEqual(mockScanHistories);
    })

})