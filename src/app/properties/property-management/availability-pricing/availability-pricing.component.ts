import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import PropertyAvailabilityEntry from '../../../shared/models/property-availability-entry.model';
import { SharedService } from '../../../shared/shared.service';


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

  @Input()
  availabilityEntries: PropertyAvailabilityEntry[] = [];

  @Input()
  autoApproveEnabled: boolean = false;

  @Input()
  cancellationDeadline: number = 0;
  
  @Input()
  pricingMode: string = 'PER_PERSON';

  dateRange: DateRange<Date> = new DateRange<Date>(null, null);

  constructor(private sharedService: SharedService) {
  }

  increment(type: 'minimum') {
    if (type === 'minimum') {
      this.cancellationDeadline++;
    }
  }

  decrement(type: 'minimum') {
    if (type === 'minimum' && this.cancellationDeadline > 0) {
      this.cancellationDeadline--;
    }
  }


  selectedDateRangeChanged(event: DateRange<Date>): void {
    this.dateRange = event;
    console.log(this.dateRange);
  }

}
