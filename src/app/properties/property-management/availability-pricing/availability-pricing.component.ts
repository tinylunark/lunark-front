import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';


@Component({
  selector: 'app-availability-pricing',
  templateUrl: './availability-pricing.component.html',
  styleUrl: './availability-pricing.component.css'
})
export class AvailabilityPricingComponent {
  selected!: Date | null;
  infoForm = new FormGroup({
    propertyName: new FormControl('', [Validators.required]),
  });

  minimumValue = 0;

  increment(type: 'minimum') {
    if (type === 'minimum') {
      this.minimumValue++;
    }
  }

  decrement(type: 'minimum') {
    if (type === 'minimum' && this.minimumValue > 0) {
      this.minimumValue--;
    }
  }
}
