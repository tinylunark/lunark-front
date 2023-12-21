import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-password-error-dialog',
  templateUrl: './update-password-error-dialog.component.html',
  styleUrl: './update-password-error-dialog.component.css'
})
export class UpdatePasswordErrorDialogComponent {
  constructor(public dialogRef: MatDialogRef<UpdatePasswordErrorDialogComponent>) { }
}
