import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PropertiesComponent} from "./properties/properties.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import { SearchPageComponent } from './search-page/search-page.component';
import { PropertyApprovalComponent } from './property-approval/property-approval.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { PropertyPriceAndAvailabilityEditComponent } from './property-price-and-availability-edit/property-price-and-availability-edit.component';
import { authGuard } from '../account/guard/auth.guard';

const routes: Routes = [
  { path: 'properties/:id', component: PropertyDetailComponent },
  { path: 'properties/:id/edit-price-and-availability', component: PropertyPriceAndAvailabilityEditComponent, canActivate: [authGuard], data: { role: ['host'] } },
  { path: 'search', component: SearchPageComponent },
  { path: 'approve-changes', component: PropertyApprovalComponent, canActivate: [authGuard], data: {role: ['ADMIN'] } },
  { path: 'my-properties', component: MyPropertiesComponent, canActivate: [authGuard], data: {role: ['HOST'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule { }
