import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';

@Component({
    selector: 'inline-range-calendar',
    templateUrl: './inline-range-calendar.component.html',
})
export class InlineRangeCalendarComponent {

    @Input() selectedRangeValue: DateRange<Date> = new DateRange<Date>(null, null);
    @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

    selectedChange(m: Date) {
        if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
            this.selectedRangeValue = new DateRange<Date>(m, null);
        } else {
            const start = this.selectedRangeValue.start;
            const end = m;
            if (end < start) {
                this.selectedRangeValue = new DateRange<Date>(end, start);
            } else {
                this.selectedRangeValue = new DateRange<Date>(start, end);
            }
        }
        this.selectedRangeValueChange.emit(this.selectedRangeValue);
    }

}