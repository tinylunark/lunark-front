import { Component } from '@angular/core';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrl: './property-new.component.css'
})
export class PropertyNewComponent {
  isLinear = true;
  header = 'new property';
  propertyType: string = '';
  minimumGuests = 0;
  maximumGuests = 0;
  validNumberOfGuests = false;
  step1Completed = false;

  amenities: number[] = [];

  onChange(): void {
    this.step1Completed = this.propertyType !== '' && this.validNumberOfGuests;
    console.log(this.amenities);
    console.log(this.propertyType);
    console.log(this.step1Completed);
  }
}
