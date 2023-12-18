import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PropertyType } from '../../../shared/models/property.model';


@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent {
  @Input()
  selectedPropertyType: PropertyType | null = null

  @Output()
  selectedPropertyTypeChange: EventEmitter<PropertyType> = new EventEmitter<PropertyType>();

  public get PropertyType() {
    return PropertyType;
  }

  selectPropertyType(type: PropertyType): void {
    this.selectedPropertyType = type;
    console.log("Selected type", this.selectedPropertyType);
    this.selectedPropertyTypeChange.emit(type);
  }
}
