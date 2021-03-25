import { ScanAction } from "@/domain/model/ScanAction";

export class ScanHistory {
    public scanAction: ScanAction;
    public scanContent: string;
    public created: Date;

    constructor(scanAction: ScanAction, scanContent: string, created?: Date) {
        this.scanAction = scanAction;
        this.scanContent = scanContent;

        if (created instanceof Date) {
            this.created = created;
        }
        else {
            this.created = new Date();
        }
    }
}