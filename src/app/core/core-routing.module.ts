import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
