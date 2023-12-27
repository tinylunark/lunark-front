import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {

  reviewForm: FormGroup = new FormGroup({
    rating: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });
  rating: number = 0;
  constructor(private dialogRef: DialogRef) { }

  submitReview() {
    if (this.reviewForm.valid) {
      this.dialogRef.close(this.reviewForm.value);
    }
  }
}
