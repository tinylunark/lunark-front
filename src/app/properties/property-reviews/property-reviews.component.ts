import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../reviews/review.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../../reviews/review-dialog/review-dialog.component';
import { Review } from '../../shared/models/review.model';

@Component({
  selector: 'app-property-reviews',
  templateUrl: './property-reviews.component.html',
  styleUrl: './property-reviews.component.css'
})
export class PropertyReviewsComponent implements OnInit {
  @Input() property: any;
  eligibleToReview = false;

  constructor(private reviewService: ReviewService, private matDialog: MatDialog) {
  } 

  ngOnInit(): void {
    this.reviewService.userIsEligibleToReviewProperty(this.property.id)
      .subscribe(eligible => {
        this.eligibleToReview = eligible;
      });
  }

  openReviewDialog() {
    let dialogRef: MatDialogRef<ReviewDialogComponent> = this.matDialog.open(ReviewDialogComponent, {
      width: "35%",
      backdropClass: "backdropBackground"
    });
    dialogRef.afterClosed().subscribe(review => this.uploadReview(review));
  }

  private uploadReview(review: Review) {
    this.reviewService.addPropertyReview(review, this.property.id).subscribe({
      next: (review: Review) => {
        this.eligibleToReview = false;
        this.property.reviews.push(review);
      },
      error: (err: any) => console.log(err)
    });
  }
}
