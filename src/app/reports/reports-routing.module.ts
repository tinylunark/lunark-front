import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ReportsComponent} from "./reports/reports.component";
import {authGuard} from "../account/guard/auth.guard";

const routes: Routes = [
  {path: '', component: ReportsComponent, canActivate: [authGuard], data: {role: ['HOST']}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {
}
