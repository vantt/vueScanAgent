import {ScanAction} from "@/domain/model/ScanAction";

export const mockScanAction1 = new ScanAction(
    "test-checkin1",
    "Test Checkin1",
    "https://127.0.0.1:8443/admin/qr-check/nestle?key=%scanValue%&activityName=CheckIn&recept=Uyen",
    true
);

export const mockScanAction2 = new ScanAction(
    "test-checkin2",
    "Test Checkin2",
    "https://127.0.0.1:8443/admin/qr-check/nestle?key=%scanValue%&activityName=CheckIn&recept=Phuong",
    true
);

export const mockScanAction3 = new ScanAction(
    "test-checkin3",
    "Test Checkin3",
    "https://127.0.0.1:8443/admin/qr-check/nestle?key=%scanValue%&activityName=CheckIn&recept=Nina",
    true
);

export const mockScanActions: ScanAction[] = [mockScanAction1, mockScanAction2, mockScanAction3];
export const EmptyScanAction: ScanAction[] = [];



