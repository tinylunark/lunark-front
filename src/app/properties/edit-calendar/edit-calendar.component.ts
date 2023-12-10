import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRange } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.component.html',
  styleUrl: './edit-calendar.component.css'
})
export class EditCalendarComponent {
  private beginDate: Date = new Date();
  private endDate: Date = new Date();

  dateRange: DateRange<Date> = new DateRange<Date>(this.beginDate, this.endDate);

  selectedDateRangeChanged(event: DateRange<Date>): void {
    this.dateRange = event;
    console.log(this.dateRange);
  }
}
