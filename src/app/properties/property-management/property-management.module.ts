import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyTypeComponent } from './property-type/property-type.component';
import { NumberOfGuestsComponent } from './number-of-guests/number-of-guests.component';
import { LocationComponent } from './location/location.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { NameComponent } from './name/name.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DescriptionComponent } from './description/description.component';
import { AvailabilityPricingComponent } from './availability-pricing/availability-pricing.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    PropertyTypeComponent,
    NumberOfGuestsComponent,
    LocationComponent,
    AmenitiesComponent,
    NameComponent,
    GalleryComponent,
    DescriptionComponent,
    AvailabilityPricingComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
  exports: [
    PropertyTypeComponent,
    NumberOfGuestsComponent,
    LocationComponent,
    AmenitiesComponent,
    NameComponent,
    GalleryComponent,
    DescriptionComponent,
    AvailabilityPricingComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropertyManagementModule { }
