import { Component } from '@angular/core';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent {
  selectedAmenities: string[] = [];

  isSelected(property: string): boolean {
    return this.selectedAmenities.includes(property);
  }

  toggleSelection(property: string): void {
    const index = this.selectedAmenities.indexOf(property);
    if (index === -1) {
      this.selectedAmenities.push(property);
    } else {
      this.selectedAmenities.splice(index, 1);
    }
  }}
