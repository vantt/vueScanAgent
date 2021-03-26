import { InvalidScanActionException } from "@/domain/exception/InvalidScanActionException";

const SCANCONTENT_PLACEHOLDER = '%scanValue%';

export class ScanAction {
  public code: string;
  public label: string;
  public link: string;
  public autoRescan: boolean;

  constructor(code: string, label: string, link: string, autoRescan: boolean) {
      this.code = code;
      this.label = label;
      this.link = link;
      this.autoRescan = autoRescan;
  }

  public getRealUrl(scanContent: string): string {
      const url = this.link.replace(`/${SCANCONTENT_PLACEHOLDER}/`, encodeURIComponent(scanContent));
      console.log(url);
      return url;
  }

  isValid(): boolean {
      if (this.code === '' || this.code === null || this.code === undefined) {
          throw new InvalidScanActionException('[code] must be a non-empty string')
      }

      if (this.label === '' || this.label === null || this.label === undefined) {
          throw new InvalidScanActionException('[label] must be a non-empty string')
      }
    
      if (this.link !== null && this.link !== undefined && this.link.indexOf(SCANCONTENT_PLACEHOLDER) === -1) {
          throw new InvalidScanActionException(`[link] must have a placeholder ${SCANCONTENT_PLACEHOLDER} for scanValue`)
      }

      return true;
  }
}