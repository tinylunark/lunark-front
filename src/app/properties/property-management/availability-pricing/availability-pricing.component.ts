import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';


@Component({
  selector: 'app-availability-pricing',
  templateUrl: './availability-pricing.component.html',
  styleUrl: './availability-pricing.component.css'
})
export class AvailabilityPricingComponent {
  selected!: Date | null;
  priceForm = new FormGroup({
    price: new FormControl('', [Validators.required]),
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

  dateRange: DateRange<Date> = new DateRange<Date>(null, null);

  selectedDateRangeChanged(event: DateRange<Date>): void {
    this.dateRange = event;
    console.log(this.dateRange);
  }
}
