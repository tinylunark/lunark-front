import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../property.service';
import PropertyAvailabilityEntry from '../../../shared/models/property-availability-entry.model';
import { DateRange } from '@angular/material/datepicker';

export interface AvailiabilityTableRow {
  from: Date;
  to: Date;
  price: number;
}

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html',
  styleUrl: './availability-table.component.css'
})
export class AvailabilityTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['from', 'to', 'price', 'delete'];
  dataSource: AvailiabilityTableRow[] = [];

  @Input() availabilityEntries: PropertyAvailabilityEntry[] = [];
  @Output() deletedRange = new EventEmitter<DateRange<Date>>();
  @Output() availabilityEntriesChange = new EventEmitter<PropertyAvailabilityEntry[]>();

  constructor() { }

  ngOnInit(): void {
    console.log("Init", this.availabilityEntries);
    this.convertAvaialabilityEntriesToRows(this.availabilityEntries);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['availabilityEntries']) {
      this.convertAvaialabilityEntriesToRows(changes['availabilityEntries'].currentValue);
    }
  }

  convertAvaialabilityEntriesToRows(availabilityEntries: PropertyAvailabilityEntry[]): void {
    if (availabilityEntries.length == 0) {
      this.dataSource = [];
      return;
    }
    availabilityEntries.sort((a, b) => a.date.getTime() - b.date.getTime());

    let currentRow: AvailiabilityTableRow = {
      from: availabilityEntries[0].date,
      to: availabilityEntries[0].date,
      price: availabilityEntries[0].price
    };
    let rows: AvailiabilityTableRow[] = [];
    for (let entry of availabilityEntries) {
      if (entry.price == currentRow.price && entry.date.getTime() - currentRow.to.getTime() <= 86400000) {
        currentRow.to = entry.date;
      } else {
        rows.push(currentRow);
        currentRow = {
          from: entry.date,
          to: entry.date,
          price: entry.price
        };
      }
    }

    rows.push(currentRow);
    this.dataSource = rows;
  }

  onDelete(row: AvailiabilityTableRow): void {
    this.deletedRange.emit(new DateRange<Date>(row.from, row.to));
    this.availabilityEntriesChange.emit(
      this.availabilityEntries.filter((entry) => {
        return (
          entry.date.getTime() < row.from.getTime() ||
          entry.date.getTime() > row.to.getTime()
        );
      })
    );
  }
}
