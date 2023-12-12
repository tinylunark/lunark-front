import { Component } from '@angular/core';
import {PropertyService} from "../property.service";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(
    private propertyService: PropertyService,
    private dialog: MatDialog,
  ) {
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
