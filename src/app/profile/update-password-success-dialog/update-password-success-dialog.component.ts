import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-password-success-dialog',
  templateUrl: './update-password-success-dialog.component.html',
  styleUrl: './update-password-success-dialog.component.css'
})
export class UpdatePasswordSuccessDialogComponent {
  constructor(public dialogRef: MatDialogRef<UpdatePasswordSuccessDialogComponent>) { }

}
