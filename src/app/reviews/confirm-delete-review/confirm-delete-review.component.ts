import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-review',
  templateUrl: './confirm-delete-review.component.html',
  styleUrl: './confirm-delete-review.component.css'
})
export class ConfirmDeleteReviewComponent {
  message: string = "Are you sure you want to delete this review?";

  constructor(private dialogRef: MatDialogRef<ConfirmDeleteReviewComponent>, @Inject(MAT_DIALOG_DATA) data: {message: string}) {
    if (data) this.message = data.message;
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onOkClick(): void {
    this.dialogRef.close(true);
  }
}
