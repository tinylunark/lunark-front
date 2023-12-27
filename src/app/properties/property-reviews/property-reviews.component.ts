import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../../reviews/review.service';

@Component({
  selector: 'app-property-reviews',
  templateUrl: './property-reviews.component.html',
  styleUrl: './property-reviews.component.css'
})
export class PropertyReviewsComponent implements OnInit {
  @Input() property: any;
  eligibleToReview = false;

  constructor(private reviewService: ReviewService) {
  } 

  ngOnInit(): void {
    this.reviewService.userIsEligibleToReviewProperty(this.property.id)
      .subscribe(eligible => {
        this.eligibleToReview = eligible;
      });
  }
}
