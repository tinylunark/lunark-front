import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import PropertyAvailabilityEntry from '../../shared/models/property-availability-entry.model';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-property-price-and-availability-edit',
  templateUrl: './property-price-and-availability-edit.component.html',
  styleUrl: './property-price-and-availability-edit.component.css'
})
export class PropertyPriceAndAvailabilityEditComponent implements OnInit {
  private beginDate: Date = new Date();
  private endDate: Date = new Date();
  menuItems: string[] = ['Calendar', 'Price Table']
  selectedMenuItem: string = this.menuItems[0];
  availabilityEntries: PropertyAvailabilityEntry[] = [];
  autoApproveEnabled: boolean = false;
  cancellationDeadline: number = 0;
  pricingMode: string = 'PER_PERSON';
  id: number = 0;

  dateRange: DateRange<Date> = new DateRange<Date>(this.beginDate, this.endDate);

  constructor(private propertyService: PropertyService, private route: ActivatedRoute, private sharedService: SharedService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    this.propertyService.getProperty(id).subscribe(property => {
      this.availabilityEntries = property.availabilityEntries;
      this.autoApproveEnabled = property.autoApproveEnabled;
      this.pricingMode = property.pricingMode;
      this.cancellationDeadline = property.cancellationDeadline;
    });
  }

  selectedMenuItemChanged(item: string): void {
    this.selectedMenuItem = item;
    console.log(item);
  }

  onAvailabilityEntriesAdded(event: PropertyAvailabilityEntry[]): void {
    let availabilityEntryMap: Map<string, PropertyAvailabilityEntry> = new Map<string, PropertyAvailabilityEntry>(this.availabilityEntries.map(entry => [entry.date.toISOString(), entry]));
    event.map(entry => availabilityEntryMap.set(entry.date.toISOString(), entry));

    let newAvailabilityEntries = Array.from(availabilityEntryMap.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
    this.editAvailabilityEntries(newAvailabilityEntries);
  }

  editAvailabilityEntries(newAvailabilityEntries: PropertyAvailabilityEntry[]): void {
    this.propertyService.changeAvailability(this.id, newAvailabilityEntries).subscribe({
      next: (response) => {
        this.availabilityEntries = response;
        this.sharedService.openSnack("Changes saved ✅");
      },
      error: (error) => {
        console.log(error);
        this.sharedService.openSnack("Could not update prices and availability ❌");
      }
    })
  }

  onDelete(range: DateRange<Date>): void {
    let startTime: number = range.start?.getTime() || 0;
    let endTime: number = range.end?.getTime() || 0;
    if (startTime && endTime){
      let newAvailabilityEntries = this.availabilityEntries.filter(entry => entry.date.getTime() < startTime || entry.date.getTime() > endTime);
      this.editAvailabilityEntries(newAvailabilityEntries);
    }
  }
}
