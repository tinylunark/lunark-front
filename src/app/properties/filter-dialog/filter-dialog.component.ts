import { Component } from '@angular/core';
import {PropertyType} from "../../shared/models/property.model";

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent {

  protected readonly PropertyType = PropertyType;
  protected readonly Object = Object;
}
