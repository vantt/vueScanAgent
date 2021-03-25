import { ScanHistory } from "@/domain/model/ScanHistory";

export default interface ScanHistoryRepositoryInterface {
  persist (entity: ScanHistory): void;
  remove (entity: ScanHistory): void;
  all(): ScanHistory[]
}