import { ScanAction } from "@/domain/model/ScanAction";
import { ScanHistory } from "@/domain/model/ScanHistory";

export interface IState {
  ipfsAddress: string,
  dbAddress: string,
  scanActions: ScanAction[]
  scanHistories: ScanHistory[]
}

export const initState: IState = {
    ipfsAddress: '',
    dbAddress: '',
    scanActions: [],
    scanHistories: []
}