import {ScanHistory} from "@/domain/model/ScanHistory";
import { mockScanAction1, mockScanAction2, mockScanAction3 } from "./mockScanActions";

export const mockScanHistory1 = new ScanHistory(
    mockScanAction1,
    "Test Checkin1"
);

export const mockScanHistory2 = new ScanHistory(
    mockScanAction2,
    "Test Checkin2",
);

export const mockScanHistory3 = new ScanHistory(
    mockScanAction3,
    "Test Checkin3",
);

export const mockScanHistories: ScanHistory[] = [mockScanHistory1, mockScanHistory2, mockScanHistory3];
export const EmptyScanHistory: ScanHistory[] = [];



