import {NgModule} from '@angular/core';
import {ReportsComponent} from './reports/reports.component';
import {SharedModule} from "../shared/shared.module";
import {ReportsRoutingModule} from "./reports-routing.module";
import {CoreModule} from "../core/core.module";
import {MaterialModule} from "../../infrastructure/material/material.module";
import { PropertyReportComponent } from './property-report/property-report.component';
import { GeneralReportComponent } from './general-report/general-report.component';
import {NgChartsModule} from "ng2-charts";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    ReportsComponent,
    PropertyReportComponent,
    GeneralReportComponent,
  ],
  imports: [
    SharedModule,
    ReportsRoutingModule,
    CoreModule,
    MaterialModule,
    NgChartsModule,
    FlexModule,
  ],
  exports: [
    ReportsComponent,
  ],
})
export class ReportsModule {
}
