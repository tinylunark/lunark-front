import { Component } from '@angular/core';

@Component({
  selector: 'app-number-of-guests',
  templateUrl: './number-of-guests.component.html',
  styleUrl: './number-of-guests.component.css'
})
export class NumberOfGuestsComponent {
  minimumValue = 0;
  maximumValue = 0;

  increment(type: 'minimum' | 'maximum') {
    if (type === 'minimum') {
      this.minimumValue++;
    } else {
      this.maximumValue++;
    }
  }

  decrement(type: 'minimum' | 'maximum') {
    if (type === 'minimum' && this.minimumValue > 0) {
      this.minimumValue--;
    } else if (type === 'maximum' && this.maximumValue > 0) {
      this.maximumValue--;
    }
  }
}
