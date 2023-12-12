import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../property.service';
import PropertyAvailabilityEntry from '../../../shared/models/property-availability-entry.model';

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
export class AvailabilityTableComponent implements OnInit {
  displayedColumns: string[] = ['from', 'to', 'price', 'delete'];
  dataSource: AvailiabilityTableRow[] = [];
  @Input() availabilityEntries: PropertyAvailabilityEntry[] = [];

  constructor() { }

  ngOnInit(): void {
    this.convertAvaialabilityEntriesToRows(this.availabilityEntries);
  }

  convertAvaialabilityEntriesToRows(availabilityEntries: PropertyAvailabilityEntry[]): void {
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
}
