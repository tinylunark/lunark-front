import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {

  reviewForm: FormGroup = new FormGroup({
    rating: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  rating: number = 0;
  constructor(public dialogRef: MatDialogRef<ReviewDialogComponent>) { }

  submitReview() {
    if (this.reviewForm.valid) {
      this.dialogRef.close(this.reviewForm.value);
    }
  }
}
