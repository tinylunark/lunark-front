import { RouterModule, Routes } from "@angular/router";
import { HostPageComponent } from "./host-page/host-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: 'host/:id', component: HostPageComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostRoutingModule { }