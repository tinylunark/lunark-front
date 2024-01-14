import {Component, OnInit} from '@angular/core';
import {Property} from "../../shared/models/property.model";
import {PropertyService} from "../../properties/property.service";
import {AccountService} from "../../account/account.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ReportService} from "../report.service";
import {ChartConfiguration} from "chart.js";
import MonthlyReport from "../monthly-report.model";
import {numberToMonth} from "../../shared/util/number-to-month";
import {jsPDF} from "jspdf";

@Component({
  selector: 'app-property-report',
  templateUrl: './property-report.component.html',
  styleUrl: './property-report.component.css'
})
export class PropertyReportComponent implements OnInit {

  properties: Property[] = [];
  form = this.formBuilder.group({
    year: new FormControl(0, [Validators.required])
  });

  // Chart setup
  barChartLegend = true;
  barChartData: ChartConfiguration<'bar'>['data'];
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false
  };

  constructor(
    private propertyService: PropertyService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {
  }

  ngOnInit() {
    this.getMyProperties();
  }

  getMyProperties() {
    const id = this.accountService.getAccountId();

    this.propertyService.getMyProperties(id)
      .subscribe(result => this.properties = result);
  }

  onSubmit(propertyId: number) {
    if (this.form.invalid
      || !this.form.value.year) return;

    this.reportService.getPropertyReport(propertyId, this.form.value.year)
      .subscribe(result => this.loadBarChartData(result.monthlyReports));
  }

  loadBarChartData(monthlyReports: MonthlyReport[]) {
    console.log(monthlyReports);

    const months: string[] = [], profits: number[] = [], reservationCounts: number[] = [];
    monthlyReports.forEach(report => {
      months.push(numberToMonth(report.month));
      profits.push(report.profit);
      reservationCounts.push(report.reservationCount);
    });

    this.barChartData = {
      labels: months,
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
        doc.save('property_report.pdf');
        content.style.color = 'white';
      }
    });
  }
}
