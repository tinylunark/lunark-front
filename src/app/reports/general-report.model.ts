import DailyReport from "./daily-report.model";

export default interface GeneralReport {
  dailyReports: DailyReport[];
  totalProfit: number;
  totalReservationCount: number;
}
