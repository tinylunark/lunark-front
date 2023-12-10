import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRange } from '@angular/material/datepicker';

@Component({
  selector: 'app-property-price-and-availability-edit',
  templateUrl: './property-price-and-availability-edit.component.html',
  styleUrl: './property-price-and-availability-edit.component.css'
})
export class PropertyPriceAndAvailabilityEditComponent {
  private beginDate: Date = new Date();
  private endDate: Date = new Date();
  menuItems: string[] = ['Calendar', 'Price Table']

  dateRange: DateRange<Date> = new DateRange<Date>(this.beginDate, this.endDate);

  selectedDateRangeChanged(event: DateRange<Date>): void {
    this.dateRange = event;
    console.log(this.dateRange);
  }

  selectedMenuItemChanged(item: string): void {
    console.log(item);
  }
}
