import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { VerificationComponent } from "./verification/verification.component";

const routes: Routes = [
  { path: 'verify/:id', component: VerificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }