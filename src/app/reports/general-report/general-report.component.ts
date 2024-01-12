import {Component, OnInit} from '@angular/core';
import GeneralReport from "../general-report.model";
import {ReportService} from "../report.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

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
      .subscribe(result => this.data = result);
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
}
