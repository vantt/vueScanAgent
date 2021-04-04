import { ScanAction } from "@/domain/model/ScanAction";

describe("ScanAction.ts is a valid Object", () => {
    test("new object create successful", () => {
        const action = new ScanAction('checkin1', 'Checkin 1', 'https://localhost/%scanValue%', true);
        expect(action.code).toEqual('checkin1');
    });

    test("real-url is successful replaced", () => {
        const action = new ScanAction('checkin1', 'Checkin 1', 'https://localhost/%scanValue%', true);
        expect(action.getRealUrl('scannedContent')).toEqual('https://localhost/scannedContent');
    });
})