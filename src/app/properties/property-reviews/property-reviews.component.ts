import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../reviews/review.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from '../../reviews/review-dialog/review-dialog.component';

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
    this.matDialog.open(ReviewDialogComponent, {
      width: "35%",
      backdropClass: "backdropBackground"
    });
  }
}
