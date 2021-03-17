export class ScanAction {
    constructor(code, label, link, autoRescan) {
        this.code = code;
        this.label = label;
        this.link = link;
        this.autoRescan = autoRescan;
    }

    getRealUrl(content) {
        return this.link.replace(/%scanValue%/, encodeURIComponent(content));
    }
}