import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PropertiesComponent} from "./properties/properties.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";

const routes: Routes = [
  { path: 'properties/:id', component: PropertyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule { }
