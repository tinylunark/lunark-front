import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-property-created-dialog',
  templateUrl: './property-created-dialog.component.html',
  styleUrl: './property-created-dialog.component.css'
})
export class PropertyCreatedDialogComponent {

  constructor(public dialogRef: MatDialogRef<PropertyCreatedDialogComponent>) { }

}
