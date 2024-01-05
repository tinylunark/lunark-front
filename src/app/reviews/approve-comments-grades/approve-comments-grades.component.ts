import { Component, OnInit } from '@angular/core';
import { Review } from '../../shared/models/review.model';
import { ReviewService } from '../../reviews/review.service';
import { SharedService } from '../../shared/shared.service';
import  moment  from 'moment';
import { environment } from '../../../env/environment';
import { ApiPaths } from '../../shared/api/api-paths.enum';

@Component({
  selector: 'app-approve-comments-grades',
  templateUrl: './approve-comments-grades.component.html',
  styleUrls: ['./approve-comments-grades.component.css']
})
export class ApproveCommentsGradesComponent implements OnInit {
  reviews: Review[] = [];
  placeholderImage = `${environment.assetsDir}/images/placeholder-profile.png`;

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

  getProfileImageURL(authorId: any): string {
    return `${environment.apiHost}/${ApiPaths.Profile}/${authorId}/profile-image`;
  }

  approveReview(review: Review) : void {
    this.reviewService.approveReview(review)
      .subscribe({
        next: (_) => {
          this.getReviews();
          this.sharedService.openSnack("Review approved.");
        }
      })
  }

  removeReview(review: Review) : void {
    this.reviewService.deleteReview(review)
      .subscribe({
        next: (_) => {
          this.getReviews();
          this.sharedService.openSnack("Review removed.");
        }
      })
  }

  handleImageError(event: any): void {
    event.target.src = this.placeholderImage;
  }

  getTimeDifference(reviewDate: Date): string {
    const currentDate = moment();
    const reviewDateTime = moment(reviewDate);

    const diffInMinutes = currentDate.diff(reviewDateTime, 'minutes');
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = currentDate.diff(reviewDateTime, 'hours');
      if (diffInHours < 24) {
        return `${diffInHours}h ago`;
      } else {
        const diffInDays = currentDate.diff(reviewDateTime, 'days');
        return `${diffInDays}d ago`;
      }
    }
  }
}

