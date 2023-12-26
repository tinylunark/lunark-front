import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import { SearchPageComponent } from './search-page/search-page.component';
import { PropertyApprovalComponent } from './property-approval/property-approval.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { PropertyEditComponent } from './property-edit/property-edit.component';
import { PropertyPriceAndAvailabilityEditComponent } from './property-price-and-availability-edit/property-price-and-availability-edit.component';
import { authGuard } from '../account/guard/auth.guard';
import { PropertyNewComponent } from './property-new/property-new.component';
import {FavoritesComponent} from "./favorites/favorites.component";

const routes: Routes = [
  { path: 'properties/:id', component: PropertyDetailComponent },
  { path: 'new-property', component: PropertyNewComponent, canActivate: [authGuard], data: { role: ['HOST'] } },
  { path: 'properties/:id/edit-price-and-availability', component: PropertyPriceAndAvailabilityEditComponent, canActivate: [authGuard], data: { role: ['HOST'] } },
  { path: 'search', component: SearchPageComponent },
  { path: 'approve-changes', component: PropertyApprovalComponent, canActivate: [authGuard], data: {role: ['ADMIN'] } },
  { path: 'my-properties', component: MyPropertiesComponent, canActivate: [authGuard], data: {role: ['HOST'] } },
  { path: 'my-properties/edit-property/:id', component: PropertyEditComponent, canActivate: [authGuard], data: {role: ['HOST'] } },
  { path: 'favorites', component: FavoritesComponent, canActivate: [authGuard], data: {role: ['GUEST']} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule { }
