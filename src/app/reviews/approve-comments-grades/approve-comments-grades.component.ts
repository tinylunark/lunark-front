import { Component, OnInit } from '@angular/core';
import { Review } from '../../shared/models/review.model';
import { ReviewService } from '../../reviews/review.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-approve-comments-grades',
  templateUrl: './approve-comments-grades.component.html',
  styleUrls: ['./approve-comments-grades.component.css']
})
export class ApproveCommentsGradesComponent implements OnInit {
  reviews: Review[] = [];

  constructor(
    private reviewService: ReviewService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.getUnapprovedReviews()
      .subscribe(reviews => {
        this.reviews = reviews;
      });
  }
}

