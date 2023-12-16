import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Amenity from '../../shared/models/amenity.model';

@Component({
  selector: 'app-property-new',
  templateUrl: './property-new.component.html',
  styleUrl: './property-new.component.css'
})
export class PropertyNewComponent {
  isLinear = true;
  header = 'new property';
  step1Complete = false;
  amenities: number[] = [];
  basicInfoFormGroup = new FormGroup({
  });

  onChange(): void {
    this.step1Complete = this.amenities.length > 0;
    console.log(this.amenities);
  }
}
