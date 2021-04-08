import { mutations } from '@/app/store/mutations'
import { IState } from "@/app/store/state";
import { ScanAction } from "@/domain/model/ScanAction";
import { mockScanAction1, mockScanAction2, mockScanAction3, mockScanActions } from "./fixtures/mockScanActions";
import {mockScanHistory1, mockScanHistory2} from "./fixtures/mockScanHistory";

describe('mutations', () => {
    describe('removeScanAction', () => {
        it('It will delete a ScanAction', () => {
            // destructure assign `mutations`
            const { removeScanAction } = mutations
          
            // mock state
            const state: IState = {
                scanActions: mockScanActions,
                scanHistories: [],
                ipfsAddress: '',
                dbAddress: '',
            }

            expect(state.scanActions).toHaveLength(3)

            // apply mutation
            removeScanAction(state, {code: 'test-checkin1'})

            // assert result
            expect(state.scanActions).toHaveLength(2)

            // apply mutation
            removeScanAction(state, {code: 'test-checkin3'})

            // assert result
            expect(state.scanActions).toHaveLength(1)
        })
    })

    describe('saveScanAction', () => {
        it('It will append the ScanAction if not-existed', () => {
            // destructure assign `mutations`
            const { saveScanAction } = mutations

            // mock state
            const state: IState = {
                scanActions: [],
                scanHistories: [],
                ipfsAddress: '',
                dbAddress: '',
            }

            expect(state.scanActions).toHaveLength(0)

            // apply mutation
            saveScanAction(state, mockScanAction1)

            // assert result
            expect(state.scanActions).toHaveLength(1)

            // apply mutation
            saveScanAction(state, mockScanAction2)

            // assert result
            expect(state.scanActions).toHaveLength(2)
        })

        it('It will update the ScanAction if existed', () => {
            // destructure assign `mutations`
            const { saveScanAction } = mutations

            // mock state
            const state: IState = {
                scanActions: mockScanActions,
                scanHistories: [],
                ipfsAddress: '',
                dbAddress: '',
            }

            expect(state.scanActions).toHaveLength(3)

            // apply mutation
            const payload = {...mockScanAction3, label: 'updated'} as ScanAction
            saveScanAction(state, payload)

            // assert result
            expect(state.scanActions[2]).toEqual(payload);
        })
    })

    describe('copyScanAction', () => {
        it('It will not copy the ScanAction if not-existed', () => {
            // destructure assign `mutations`
            const { copyScanAction } = mutations

            // mock state
            const state: IState = {
                scanActions: [mockScanAction1],
                scanHistories: [],
                ipfsAddress: '',
                dbAddress: '',
            }

            expect(state.scanActions).toHaveLength(1)

            // apply mutation
            copyScanAction(state, {code: 'old-code', newCode: 'new-code'})

            // assert result
            expect(state.scanActions).toHaveLength(1)
        })

        it('It will copy the ScanAction if existed', () => {
            // destructure assign `mutations`
            const { copyScanAction } = mutations

            // mock state
            const state: IState = {
                scanActions: [mockScanAction1],
                scanHistories: [],
                ipfsAddress: '',
                dbAddress: '',
            }

            expect(state.scanActions).toHaveLength(1)

            // apply mutation
            copyScanAction(state, {code: mockScanAction1.code, newCode: 'changed_code'})

            // assert result
            expect(state.scanActions).toHaveLength(2)
            expect(state.scanActions[1]).toEqual({...mockScanAction1, code: 'changed_code'} as ScanAction)
        })
    })

    describe('addHistory', () => {
        it('It will always add a new History', () => {
            // destructure assign `mutations`
            const { addHistory } = mutations

            // mock state
            const state: IState = {
                scanActions: [],
                scanHistories: [],
                ipfsAddress: '',
                dbAddress: '',
            }

            expect(state.scanHistories).toHaveLength(0)

            // apply mutation
            addHistory(state, mockScanHistory1)

            // assert result
            expect(state.scanHistories).toHaveLength(1)

            // apply mutation
            addHistory(state, mockScanHistory1)

            // assert result
            expect(state.scanHistories).toHaveLength(2)

            // apply mutation
            addHistory(state, mockScanHistory2)

            // assert result
            expect(state.scanHistories).toHaveLength(3)
        })

        it('It will handle Created Date correctly', () => {
            // destructure assign `mutations`
            const { addHistory } = mutations

            // mock state
            const state: IState = {
                scanActions: [],
                scanHistories: [],
                ipfsAddress: '',
                dbAddress: '',
            }

            // apply mutation
            addHistory(state, mockScanHistory1)

            // assert result
            expect(state.scanHistories[0].created).not.toBeNull()

            const mockDate = new Date();
            addHistory(state, {...mockScanHistory1, created: mockDate})

            expect(state.scanHistories[0].created).toEqual(mockDate)
        })
    })
})