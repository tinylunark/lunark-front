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
import { PropertyPriceAndAvailabilityEditComponent } from './property-price-and-availability-edit/property-price-and-availability-edit.component';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';
import { AvailabilityTableComponent } from './availability-table/availability-table.component';


@NgModule({
  declarations: [
    PropertiesComponent,
    PropertyDetailComponent,
    SearchComponent,
    SearchPageComponent,
    PropertyNewComponent,
    EditCalendarComponent,
    AvailabilityTableComponent,
    PropertyPriceAndAvailabilityEditComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    SharedModule,
    PropertiesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    PropertyManagementModule,
    CoreModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearchComponent,
    PropertiesComponent,
    PropertyNewComponent,
  ]
})
export class PropertiesModule {
}
