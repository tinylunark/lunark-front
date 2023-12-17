import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number-of-guests',
  templateUrl: './number-of-guests.component.html',
  styleUrl: './number-of-guests.component.css'
})
export class NumberOfGuestsComponent {
  @Input()
  minimum = 0;

  @Output()
  minimumChange = new EventEmitter<number>();

  @Input()
  maximum = 0;

  @Output()
  maximumChange = new EventEmitter<number>();

  @Output()
  isValidChange = new EventEmitter<boolean>();

  increment(type: 'minimum' | 'maximum') {
    if (type === 'minimum') {
      this.minimum++;
    } else {
      this.maximum++;
    }
    this.minimumChange.emit(this.minimum);
    this.maximumChange.emit(this.maximum);
    this.checkValidity()
  }

  decrement(type: 'minimum' | 'maximum') {
    if (type === 'minimum' && this.minimum > 0) {
      this.minimum--;
    } else if (type === 'maximum' && this.maximum > 0) {
      this.maximum--;
    }
    this.minimumChange.emit(this.minimum);
    this.maximumChange.emit(this.maximum);
    this.checkValidity();
  }

  checkValidity(): void {
    this.isValidChange.emit(this.minimum > 0 && this.minimum <= this.maximum);
    console.log(this.minimum);
    console.log(this.maximum);
  } 
}
