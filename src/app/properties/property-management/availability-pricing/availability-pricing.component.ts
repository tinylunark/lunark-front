import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import PropertyAvailabilityEntry from '../../../shared/models/property-availability-entry.model';
import { SharedService } from '../../../shared/shared.service';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-availability-pricing',
  templateUrl: './availability-pricing.component.html',
  styleUrl: './availability-pricing.component.css',
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

  @Output()
  newAvailabilityEntries = new EventEmitter<PropertyAvailabilityEntry[]>();

  @Output()
  availabilityEntriesChange = new EventEmitter<PropertyAvailabilityEntry[]>();

  @Output()
  deletedRange = new EventEmitter<DateRange<Date>>();

  constructor(private sharedService: SharedService) {}

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

  resetAvailabilityAddForm(): void {
    this.priceForm.reset();
    this.dateRange = new DateRange<Date>(null, null);
  }

  onAddChange(): void {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    if (
      this.dateRange.start &&
      this.dateRange.start.getTime() <= startOfToday.getTime()
    ) {
      this.sharedService.openSnack(
        'You cannot add availability for past dates ❌'
      );
      return;
    }
    if (this.dateRange.start && this.priceForm.valid) {
      let newEntries: PropertyAvailabilityEntry[] = [];
      let currentDate = new Date(this.dateRange.start);

      while (currentDate <= (this.dateRange.end || this.dateRange.start)) {
        newEntries.push({
          date: currentDate,
          price: +(this.priceForm.value.price || 0),
        });
        let nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);
        currentDate = nextDate;
      }

      this.resetAvailabilityAddForm();

      this.newAvailabilityEntries.emit(newEntries);
      this.emitEntriesAfterAddition(newEntries);
    } else {
      this.sharedService.openSnack('Please fill in all fields');
    }
  }

  emitEntriesAfterAddition(newEntries: PropertyAvailabilityEntry[]): void {
    let availabilityEntryMap: Map<string, PropertyAvailabilityEntry> = new Map<string, PropertyAvailabilityEntry>(this.availabilityEntries.map(entry => [entry.date.toISOString(), entry]));
    newEntries.map(entry => availabilityEntryMap.set(entry.date.toISOString(), entry));
  
    let newAvailabilityEntries = Array.from(availabilityEntryMap.values()).sort((a, b) => a.date.getTime() - b.date.getTime())
    this.availabilityEntriesChange.emit(newAvailabilityEntries);
  }

  onDelete(): void {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    if (
      this.dateRange.start &&
      this.dateRange.start.getTime() <= startOfToday.getTime()
    ) {
      this.sharedService.openSnack(
        'You cannot delete availability for past dates ❌'
      );
      return;
    }

    if (this.dateRange.start && this.dateRange.end) {
      this.deletedRange.emit(this.dateRange);

      this.emitEntriesAfterDeletion();
    }
  }

  private emitEntriesAfterDeletion() {
    const startDate: Date = this.dateRange.start || new Date();
    const endDate: Date = this.dateRange.end || new Date();
    console.log('Deleting', startDate, endDate);
    console.log('Before', this.availabilityEntries);
    console.log(
      'After',
      this.availabilityEntries.filter((entry) => {
        return (
          entry.date.getTime() < startDate.getTime() ||
          entry.date.getTime() > endDate.getTime()
        );
      })
    );
    this.availabilityEntriesChange.emit(
      this.availabilityEntries.filter((entry) => {
        return (
          entry.date.getTime() < startDate.getTime() ||
          entry.date.getTime() > endDate.getTime()
        );
      })
    );
  }
}
