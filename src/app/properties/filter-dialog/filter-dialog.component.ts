import {Component, Inject} from '@angular/core';
import {PropertyType} from "../../shared/models/property.model";
import {AmenityService} from "../../amenity.service";
import Amenity from "../../shared/models/amenity.model";
import PropertiesSearchDto from "../properties-search.dto";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent {
  amenities: Amenity[] = [];

  constructor(
    private amenityService: AmenityService,
    @Inject(MAT_DIALOG_DATA) protected data: PropertiesSearchDto,
  ) {
  }

  ngOnInit(): void {
    this.getAmenities();
  }

  getAmenities(): void {
    this.amenityService.getAmenities()
      .subscribe(amenities => this.amenities = amenities);
  }

  onCheckboxClick(amenityId: number): void {
    if (!this.data.amenityIds) {
      this.data.amenityIds = [];
    }

    if (this.data.amenityIds?.includes(amenityId)) {
      const index = this.data.amenityIds?.indexOf(amenityId);
      this.data.amenityIds?.splice(index, 1);
    } else {
      this.data.amenityIds?.push(amenityId);
    }
  }

  protected readonly PropertyType = PropertyType;
  protected readonly Object = Object;
}
