import { NgModule} from '@angular/core';
import { PropertiesComponent } from "./properties/properties.component";
import { PropertiesRoutingModule } from "./properties-routing.module";
import { SharedModule } from "../shared/shared.module";
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../../infrastructure/material/material.module";
import { CoreModule } from '../core/core.module';
import { SearchComponent } from './search/search.component';
import { AsyncPipe } from "@angular/common";
import { SearchPageComponent } from './search-page/search-page.component';
import { PropertyNewComponent } from './property-new/property-new.component';
import { PropertyManagementModule } from './property-management/property-management.module';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { PropertyPriceAndAvailabilityEditComponent } from './property-price-and-availability-edit/property-price-and-availability-edit.component';
import { PropertyApprovalComponent } from './property-approval/property-approval.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { PropertyEditComponent } from './property-edit/property-edit.component';
import { PropertyCreatedDialogComponent } from './property-created-dialog/property-created-dialog.component';
import { PropertyUpdatedDialogComponent } from './property-updated-dialog/property-updated-dialog.component';
import { FavoriteActionComponent } from './favorite-action/favorite-action.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReviewsComponent } from '../reviews/reviews/reviews.component';
import { ReviewsModule } from '../reviews/reviews.module';
import { AccountModule } from '../account/account.module';


@NgModule({
  declarations: [
    PropertiesComponent,
    PropertyDetailComponent,
    SearchComponent,
    SearchPageComponent,
    PropertyNewComponent,
    FilterDialogComponent,
    PropertyPriceAndAvailabilityEditComponent,
    PropertyApprovalComponent,
    MyPropertiesComponent,
    PropertyEditComponent,
    PropertyCreatedDialogComponent,
    PropertyUpdatedDialogComponent,
    FavoriteActionComponent,
    FavoritesComponent,
  ],
  imports: [
    SharedModule,
    PropertiesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    PropertyManagementModule,
    CoreModule,
    AsyncPipe,
    ReviewsModule,
    AccountModule
  ],
  exports: [
    SearchComponent,
    PropertiesComponent,
    PropertyNewComponent,
    PropertyApprovalComponent,
    MyPropertiesComponent,
    PropertyEditComponent,
    PropertyUpdatedDialogComponent,
  ]
})
export class PropertiesModule {
}
