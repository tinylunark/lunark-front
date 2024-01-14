import {Component, OnInit} from '@angular/core';
import GeneralReport from "../general-report.model";
import {ReportService} from "../report.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ChartConfiguration} from "chart.js";
import DailyReport from "../daily-report.model";
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrl: './general-report.component.css'
})
export class GeneralReportComponent implements OnInit {

  data?: GeneralReport;
  form = this.formBuilder.group({
    startDate: new FormControl(new Date(), [Validators.required]),
    endDate: new FormControl(new Date(), [Validators.required])
  });

  // Chart setup
  lineChartLegend = true;
  lineChartData: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: false
  };

  constructor(
    private reportService: ReportService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getGeneralReport(new Date(), new Date());
  }

  getGeneralReport(start: Date, end: Date) {
    this.reportService.getGeneralReport(start, end)
      .subscribe(result => {
        this.data = result;
        this.loadLineChartData(result.dailyReports);
      });
  }

  onSubmit() {
    if (!this.form.valid
      || !this.form.value.startDate
      || !this.form.value.endDate) return;

    this.getGeneralReport(
      this.form.value.startDate,
      this.form.value.endDate
    );
  }

  loadLineChartData(dailyReports: DailyReport[]) {
    console.log(dailyReports);

    const dates: string[] = [], profits: number[] = [], reservationCounts: number[] = [];
    dailyReports.forEach(report => {
      dates.push(report.date.toLocaleDateString('sv'));
      profits.push(report.profit);
      reservationCounts.push(report.reservationCount);
    });

    this.lineChartData = {
      labels: dates,
      datasets: [
        {data: profits, label: 'Profit'},
        {data: reservationCounts, label: 'Number of reservations'}
      ]
    };
  }

  onExport(content: HTMLElement) {
    const doc = new jsPDF();
    content.style.color = 'black';
    doc.html(content, {
      html2canvas: {
        scale: 0.5
      },
      callback: function (doc) {
        doc.save('general_report.pdf');
        content.style.color = 'white';
      }
    });
  }
}
