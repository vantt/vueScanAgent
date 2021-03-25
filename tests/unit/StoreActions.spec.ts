import {actions} from "@/store/actions";
import {mockScanAction1} from "./fixtures/mockScanActions";

describe("Store Actions", () => {
    it("removeScanAction ", async () => {
        const commit = jest.fn()
        await actions.removeScanAction({ commit }, {code: mockScanAction1.code})

        expect(commit).toHaveBeenCalledWith("removeScanAction", {code: mockScanAction1.code})
    })

    it("saveScanAction", async () => {
        const commit = jest.fn()
        await actions.saveScanAction({ commit }, mockScanAction1)

        expect(commit).toHaveBeenCalledWith("saveScanAction", mockScanAction1)
    })

    it("copyScanAction", async () => {
        const commit = jest.fn()
        const payload = { code: 'old-code', newCode: 'new-code' }
        await actions.copyScanAction({ commit }, payload)

        expect(commit).toHaveBeenCalledWith("copyScanAction", payload)
    })
})

