import {Component, OnInit} from '@angular/core';
import GeneralReport from "../general-report.model";
import {ReportService} from "../report.service";

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrl: './general-report.component.css'
})
export class GeneralReportComponent implements OnInit {

  data?: GeneralReport;

  constructor(
    private reportService: ReportService
  ) {
  }

  ngOnInit(): void {
    this.getGeneralReport();
  }

  getGeneralReport() {
    this.reportService.getGeneralReport(new Date(), new Date())
      .subscribe(result => this.data = result);
  }
}
