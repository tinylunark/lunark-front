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
  ],
  imports: [
    SharedModule,
    PropertiesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    PropertyManagementModule,
    CoreModule,
    AsyncPipe,
    MaterialModule
  ],
  exports: [
    SearchComponent,
    PropertiesComponent,
    PropertyNewComponent,
    PropertyApprovalComponent,
  ]
})
export class PropertiesModule {
}
