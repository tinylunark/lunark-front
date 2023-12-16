import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-property-type',
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent {
  @Input()
  selectedPropertyType: string = '';

  @Output()
  selectedPropertyTypeChange: EventEmitter<string> = new EventEmitter<string>();

  selectPropertyType(type: string): void {
    this.selectedPropertyType = type;
    this.selectedPropertyTypeChange.emit(type);
  }
}
