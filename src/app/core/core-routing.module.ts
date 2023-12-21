import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {NgModule} from "@angular/core";
import { SessionExpiredComponent } from "./session-expired/session-expired.component";

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent },
  { path: 'session-expired', component: SessionExpiredComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
