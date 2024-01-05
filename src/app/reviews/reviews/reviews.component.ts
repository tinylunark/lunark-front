import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReviewService } from '../review.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';
import { Review } from '../../shared/models/review.model';
import { SharedService } from '../../shared/shared.service';
import { ConfirmDeleteReviewComponent } from '../confirm-delete-review/confirm-delete-review.component';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  @Input() id: number;
  @Output() reviewDeleted: EventEmitter<void> = new EventEmitter<void>();
  eligibleToReview = false;

  constructor(private reviewService: ReviewService, private matDialog: MatDialog, private sharedService: SharedService) {
  } 

  ngOnInit(): void {
    this.reviewService.eligibleToReview(this.id)
      .subscribe(eligible => {
        this.eligibleToReview = eligible;
      });
    this.reviewService.getReviews(this.id)
      .subscribe(reviews => {
        this.reviews = reviews;
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
    this.reviewService.add(review, this.id).subscribe({
      next: (review: Review) => {
        this.eligibleToReview = false;
        this.reviews.push(review);
        this.sharedService.openSnack("Review added successfully!");
      },
      error: (err: any) => console.log(err)
    });
  }
  
  onDelete(reviewId: number): void {
    let dialogRef = this.matDialog.open(ConfirmDeleteReviewComponent, {
      width: "35%",
      backdropClass: "backdropBackground"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.delete(reviewId);
    });
  }

  private delete(reviewId: number): void {
    this.reviewService.delete(reviewId).subscribe({
      next: () => {
        this.reviews.splice(0, this.reviews.length,...this.reviews.filter((review: Review) => review.id !== reviewId))
        this.sharedService.openSnack("Review deleted successfully!");
        this.reviewDeleted.emit();
      },
      error: (err: any) => console.log(err)
    });
  }
}
