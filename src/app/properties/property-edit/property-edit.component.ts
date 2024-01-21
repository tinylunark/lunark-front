import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PropertyUpdatedDialogComponent } from '../property-updated-dialog/property-updated-dialog.component';
import { Observable } from 'rxjs';
import PropertyAvailabilityEntry from '../../shared/models/property-availability-entry.model';
import PropertyRequest from '../../shared/models/property-request.model';
import { SharedService } from '../../shared/shared.service';



@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrl: './property-edit.component.css'
})
export class PropertyEditComponent implements OnInit {
    menuItems: string[] = ['basic information', 'location', 'amenities', 'calendar', 'price table', 'other'];
  propertyImages: File[] = [];
  selectedMenuItem: string = this.menuItems[0];
  id: number = 0;
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
    hostId: 0,
  };

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    this.propertyService.getProperty(id).subscribe(property => {
      console.log(property);
      this.property = {
        id: property.id,
        name: property.name,
        longitude: property.longitude,
        latitude: property.latitude,
        address: {
          street: property.address.street,
          city: property.address.city,
          country: property.address.country,
        },
        description: property.description,
        type: property.type,
        availabilityEntries: property.availabilityEntries,
        cancellationDeadline: property.cancellationDeadline,
        pricingMode: property.pricingMode,
        autoApproveEnabled: property.autoApproveEnabled,
        minGuests: property.minGuests,
        maxGuests: property.maxGuests,
        amenityIds: property.amenities.map((amenity) => amenity.id),
        hostId: property.host?.id || 0,
      };
      this.propertyNameControl.setValue(this.property.name);
    });
  }

  selectedMenuItemChanged(item: string): void {
    this.selectedMenuItem = item;
  }

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

  onChange(): void {
    this.property.name = this.propertyNameControl.value;
  }

  private uploadImages(propertyId: number): Observable<Object[]> {
    return this.propertyService.uploadImages(propertyId, this.propertyImages);
  }

  onSubmit(): void {
    this.propertyService.updateProperty(this.property).subscribe({
      next: (property) => {
        console.log(property);
        this.uploadImages(property.id).subscribe({
          complete: () => {
            const dialogRef = this.matDialog.open(PropertyUpdatedDialogComponent, { backdropClass: 'backdropBackground', });
            dialogRef.afterClosed().subscribe(() => { this.router.navigate(['/my-properties']); });
          },
        });
      },
      error: (error) => {
        console.log(error);
        if (error.status === 400) {
            this.sharedService.openSnack('One of the fields you have edited is not valid.');
        }
        if (error.status === 409) {
            this.sharedService.openSnack('You have closed the property for a date on which there is a reservation.');
        }
      },
    });
  }

}
