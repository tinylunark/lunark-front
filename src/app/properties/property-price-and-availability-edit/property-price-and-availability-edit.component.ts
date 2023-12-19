import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import PropertyAvailabilityEntry from '../../shared/models/property-availability-entry.model';
import { SharedService } from '../../shared/shared.service';
import PropertyRequest from '../../shared/models/property-request.model';
import { convertToPropertyRequest } from '../../shared/models/property.model';

@Component({
  selector: 'app-property-price-and-availability-edit',
  templateUrl: './property-price-and-availability-edit.component.html',
  styleUrl: './property-price-and-availability-edit.component.css',
})
export class PropertyPriceAndAvailabilityEditComponent implements OnInit {
  private beginDate: Date = new Date();
  private endDate: Date = new Date();
  menuItems: string[] = ['Calendar', 'Price Table'];
  selectedMenuItem: string = this.menuItems[0];
  id: number = 0;
  property: PropertyRequest | null = null;

  dateRange: DateRange<Date> = new DateRange<Date>(
    this.beginDate,
    this.endDate
  );

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    this.propertyService.getProperty(id).subscribe((property) => {
      this.property = convertToPropertyRequest(property);
    });
  }

  selectedMenuItemChanged(item: string): void {
    this.selectedMenuItem = item;
    console.log(item);
  }

  editAvailabilityEntries(
    newAvailabilityEntries: PropertyAvailabilityEntry[]
  ): void {
    this.propertyService
      .changeAvailability(this.id, newAvailabilityEntries)
      .subscribe({
        next: (response) => {
          if (this.property == null) {
            return;
          }
          this.property.availabilityEntries = response;
          this.sharedService.openSnack('Changes saved ✅');
        },
        error: (error) => {
          console.log(error);
          this.sharedService.openSnack(
            'Could not update prices and availability ❌'
          );
        },
      });
  }

  onSave(): void {
    if (this.property == null) {
      return;
    }
    this.propertyService.updateProperty(this.property).subscribe({
      next: (response) => {
        this.property = convertToPropertyRequest(response);
        this.sharedService.openSnack('Changes saved ✅');
      },
    });
  }
}
