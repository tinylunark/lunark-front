import { Component } from '@angular/core';

@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent {
  selectedProperty: string = '';

  selectProperty(property: string): void {
    this.selectedProperty = property;
  }
}
