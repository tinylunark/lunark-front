import {Component, EventEmitter, Output} from '@angular/core';
import {PropertyService} from "../property.service";
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import PropertiesSearchDto from "../properties-search.dto";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchDto: PropertiesSearchDto = {};

  @Output() searchEmitter = new EventEmitter<PropertiesSearchDto>();

  constructor(
    private propertyService: PropertyService,
    private dialog: MatDialog,
  ) {
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      data: this.searchDto,
    });
  }

  onSearchClick(): void {
    this.searchEmitter.emit(this.searchDto);
  }
}
