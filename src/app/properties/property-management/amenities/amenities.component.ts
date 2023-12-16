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
  public selectedAmenitiesChange = new EventEmitter<string[]>();

  @Input()
  public selectedAmenities: string[] = [];

  amenities: Amenity[] = [];

  constructor(private amenitiyService: AmenityService) { }

  ngOnInit(): void {
    this.amenitiyService.getAmenities().subscribe((amenities: Amenity[]) => {
      this.amenities = amenities;
    });
  }

  isSelected(amenity: string): boolean {
    return this.selectedAmenities.includes(amenity);
  }

  toggleSelection(amenity: string): void {
    const index = this.selectedAmenities.indexOf(amenity);
    if (index === -1) {
      this.selectedAmenities.push(amenity);
    } else {
      this.selectedAmenities.splice(index, 1);
    }
    this.selectedAmenitiesChange.emit(this.selectedAmenities);
  }}
