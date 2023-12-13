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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { PropertyPriceAndAvailabilityEditComponent } from './property-price-and-availability-edit/property-price-and-availability-edit.component';


@NgModule({
  declarations: [
    PropertiesComponent,
    PropertyDetailComponent,
    SearchComponent,
    SearchPageComponent,
    PropertyNewComponent,
    FilterDialogComponent,
    PropertyPriceAndAvailabilityEditComponent
  ],
  imports: [
    SharedModule,
    PropertiesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    PropertyManagementModule,
    CoreModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  exports: [
    SearchComponent,
    PropertiesComponent,
    PropertyNewComponent,
  ]
})
export class PropertiesModule {
}
