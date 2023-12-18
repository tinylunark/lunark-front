import { Component } from '@angular/core';
import PropertyRequest from '../../shared/models/property-request.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrl: './property-new.component.css',
})
export class PropertyNewComponent {
  isLinear = true;
  header = 'new property';
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  propertyNameControl: FormControl = new FormControl('', Validators.required);

  public property: PropertyRequest = {
    id: 0,
    name: this.propertyNameControl.value,
    latitude: 0,
    longitude: 0,
    address: {
      street: '',
      city: '',
      country: '',
    },
    description: '',
    type: null,
    availabilityEntries: [],
    cancellationDeadline: 0,
    pricingMode: '',
    autoApproveEnabled: false,
    minGuests: 0,
    maxGuests: 0,
    amenityIds: [],
  };
  propertyImages: File[] = [];

  private isNumberOfGuestsValid(): boolean {
    return (
      this.property.minGuests > 0 &&
      this.property.minGuests <= this.property.maxGuests
    );
  }

  private isLocationValid(): boolean {
    return (
      this.property.address.street !== '' &&
      this.property.address.city !== '' &&
      this.property.address.country !== '' &&
      this.property.latitude !== null &&
      this.property.longitude !== null
    );
  }

  checkForStepCompletions(): void {
    this.step1Completed =
      this.property.type !== null &&
      this.isNumberOfGuestsValid() &&
      this.isLocationValid();

    this.step2Completed =
      this.property.name !== '' &&
      this.property.description !== '' &&
      this.propertyImages.length > 0;

    this.step3Completed =
      this.property.availabilityEntries.length > 0 &&
      this.property.pricingMode !== '' &&
      this.property.cancellationDeadline >= 0;
  }

  onChange(): void {
    this.property.name = this.propertyNameControl.value;
    this.checkForStepCompletions();
    console.log(this.property);
  }

  onSubmit(): void {
    console.log("Submit");
    console.log(this.property);
  }
}
