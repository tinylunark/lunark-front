import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-review',
  templateUrl: './confirm-delete-review.component.html',
  styleUrl: './confirm-delete-review.component.css'
})
export class ConfirmDeleteReviewComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmDeleteReviewComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onOkClick(): void {
    this.dialogRef.close(true);
  }
}
