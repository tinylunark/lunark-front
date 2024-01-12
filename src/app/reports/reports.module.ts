import {NgModule} from '@angular/core';
import {ReportsComponent} from './reports/reports.component';
import {SharedModule} from "../shared/shared.module";
import {ReportsRoutingModule} from "./reports-routing.module";
import {CoreModule} from "../core/core.module";
import {MaterialModule} from "../../infrastructure/material/material.module";


@NgModule({
  declarations: [
    ReportsComponent,
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
