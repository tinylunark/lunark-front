import {Component, OnInit} from '@angular/core';
import {Property} from "../../shared/models/property.model";
import {PropertyService} from "../../properties/property.service";
import {AccountService} from "../../account/account.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ReportService} from "../report.service";

@Component({
  selector: 'app-property-report',
  templateUrl: './property-report.component.html',
  styleUrl: './property-report.component.css'
})
export class PropertyReportComponent implements OnInit {

  properties: Property[] = [];
  form = this.formBuilder.group({
    year: new FormControl(0, [Validators.required])
  })

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
      .subscribe(result => console.log(result));
  }
}
