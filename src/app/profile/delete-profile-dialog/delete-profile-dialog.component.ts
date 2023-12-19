import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-profile-dialog',
  templateUrl: './delete-profile-dialog.component.html',
  styleUrl: './delete-profile-dialog.component.css'
})
export class DeleteProfileDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteProfileDialogComponent>) { }
}
