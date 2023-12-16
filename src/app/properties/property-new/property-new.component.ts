import { Component } from '@angular/core';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrl: './property-new.component.css'
})
export class PropertyNewComponent {
  isLinear = true;
  header = 'new property';
  step1Completed = false;
  amenities: number[] = [];
  propertyType: string = '';

  onChange(): void {
    this.step1Completed = this.propertyType !== '';
    console.log(this.amenities);
    console.log(this.propertyType);
    console.log(this.step1Completed);
  }
}
