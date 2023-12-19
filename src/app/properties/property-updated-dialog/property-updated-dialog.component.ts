import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-property-updated-dialog',
  templateUrl: './property-updated-dialog.component.html',
  styleUrl: './property-updated-dialog.component.css'
})
export class PropertyUpdatedDialogComponent {
  constructor(public dialogRef: MatDialogRef<PropertyUpdatedDialogComponent>) { }
}
