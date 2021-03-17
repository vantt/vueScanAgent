export class ScanHistory {
    constructor(scanAction, content, created) {
        this.scanAction = scanAction;
        this.content = content;

        if (created === undefined || created == null) {
            this.created = new Date();
        }
        this.created = created;
    }
}