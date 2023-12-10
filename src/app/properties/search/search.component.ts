import { Component } from '@angular/core';
import {PropertyService} from "../property.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  locationControl = new FormControl('');
  locationOptions: string[] = [];
  filteredOptions?: Observable<string[]>;

  constructor(private propertyService: PropertyService) {
  }

  // ngOnInit(): void {
  //   this.getLocations();
  //
  //   this.filteredOptions = this.locationControl.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filter(value || '')),
  //   );
  // }
  //
  // getLocations(): void {
  //   this.propertyService.getLocations()
  //     .subscribe(([]) => this.locationOptions = locations.map(
  //       (location) => `${location.city}, ${location.country}`
  //     ));
  // }
  //
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.locationOptions.filter(option => option.toLowerCase().includes(filterValue));
  // }
}
