import { Component } from '@angular/core';
import PropertyRequest from '../../shared/models/property-request.model';
import { FormControl, Validators } from '@angular/forms';
import { PropertyService } from '../property.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PropertyCreatedDialogComponent } from '../property-created-dialog/property-created-dialog.component';
import { Observable } from 'rxjs';

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

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

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

  private uploadImages(propertyId: number): Observable<Object[]> {
    return this.propertyService.uploadImages(propertyId, this.propertyImages);
  }

  onSubmit(): void {
    console.log('Submit');
    console.log(this.property);
    this.propertyService.createProperty(this.property).subscribe({
      next: (property) => {
        console.log(property);
        this.uploadImages(property.id).subscribe({
          complete: () => {
            const dialogRef = this.matDialog
              .open(PropertyCreatedDialogComponent, {
                backdropClass: 'backdropBackground',
              });
              dialogRef.afterClosed().subscribe(() => {
                this.router.navigate(['/properties', property.id]);
              });
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
