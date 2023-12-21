import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AmenityService } from '../../../amenity.service';
import Amenity from '../../../shared/models/amenity.model';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent implements OnInit {
  @Output()
  public selectedAmenityIdsChange = new EventEmitter<number[]>();

  @Input()
  public selectedAmenityIds: number[] = [];

  amenities: Amenity[] = [];

  constructor(private amenitiyService: AmenityService) { }

  ngOnInit(): void {
    this.amenitiyService.getAmenities().subscribe((amenities: Amenity[]) => {
      this.amenities = amenities;
    });
  }

  isSelected(amenityId: number): boolean {
    return this.selectedAmenityIds.includes(amenityId);
  }

  toggleSelection(amenityId: number): void {
    const index = this.selectedAmenityIds.indexOf(amenityId);
    if (index === -1) {
      this.selectedAmenityIds.push(amenityId);
    } else {
      this.selectedAmenityIds.splice(index, 1);
    }
    this.selectedAmenityIdsChange.emit(this.selectedAmenityIds);
  }}
