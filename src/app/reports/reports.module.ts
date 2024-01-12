import {NgModule} from '@angular/core';
import {ReportsComponent} from './reports/reports.component';
import {SharedModule} from "../shared/shared.module";
import {ReportsRoutingModule} from "./reports-routing.module";
import {CoreModule} from "../core/core.module";
import {MaterialModule} from "../../infrastructure/material/material.module";
import { PropertyReportComponent } from './property-report/property-report.component';
import { GeneralReportComponent } from './general-report/general-report.component';


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
  ],
  exports: [
    ReportsComponent,
  ],
})
export class ReportsModule {
}