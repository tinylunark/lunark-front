import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PropertiesComponent} from "./properties/properties.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import { SearchPageComponent } from './search-page/search-page.component';
import { PropertyPriceAndAvailabilityEditComponent } from './property-price-and-availability-edit/property-price-and-availability-edit.component';

const routes: Routes = [
  { path: 'properties/:id', component: PropertyDetailComponent },
  { path: 'properties/:id/edit-price-and-availability', component: PropertyPriceAndAvailabilityEditComponent },
  { path: 'search', component: SearchPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule { }
