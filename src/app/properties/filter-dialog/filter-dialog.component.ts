import { Component } from '@angular/core';
import {PropertyType} from "../../shared/models/property.model";
import {AmenityService} from "../../amenity.service";
import Amenity from "../../shared/models/amenity.model";

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent {
  amenities: Amenity[] = [];

  constructor(
    private amenityService: AmenityService,
  ) {
  }

  ngOnInit(): void {
    this.getAmenities();
  }

  getAmenities(): void {
    this.amenityService.getAmenities()
      .subscribe(amenities => this.amenities = amenities);
  }

  protected readonly PropertyType = PropertyType;
  protected readonly Object = Object;
}
