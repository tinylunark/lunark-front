import { Component, OnInit } from '@angular/core';
import { ReviewReport } from '../../shared/models/review-report.model';
import { ReviewReportService } from '../../reviews/review-report.service';
import { ReviewService } from '../../reviews/review.service';
import { ProfileService } from '../../shared/profile.service'; // Import the ProfileService
import { SharedService } from '../../shared/shared.service';
import { ReviewReportDisplay } from './review-report-display.model';
import { ApiPaths } from '../../shared/api/api-paths.enum';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../env/environment';
import moment from 'moment';

@Component({
  selector: 'app-reported-comments-grades',
  templateUrl: './reported-comments-grades.component.html',
  styleUrls: ['./reported-comments-grades.component.css']
})
export class ReportedCommentsGradesComponent implements OnInit {
  reviewReports: ReviewReportDisplay[] = [];
  placeholderImage = `${environment.assetsDir}/images/placeholder-profile.png`;

  constructor(
    private reviewReportService: ReviewReportService,
    private reviewService: ReviewService,
    private profileService: ProfileService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getReviewReports();
  }

  getReviewReports(): void {
    this.reviewReportService.getAllReviewReports()
      .pipe(
        switchMap((reports: ReviewReport[]) => {
          const requests: Observable<ReviewReportDisplay>[] = reports.map(report =>
            forkJoin({
              reporter: this.profileService.getProfileById(report.reporterId),
              review: this.reviewService.getReviewById(report.reviewId)
            }).pipe(
              map(({ reporter, review }) => {
                const displayModel = new ReviewReportDisplay();
                displayModel.id = report.id;
                displayModel.date = report.date;
                displayModel.reporter = reporter;
                displayModel.review = review;
                displayModel.reviewType = review.type;
                return displayModel;
              })
            )
          );
          return forkJoin(requests);
        })
      )
      .subscribe({
        next: (data: ReviewReportDisplay[]) => {
          this.reviewReports = data;
        },
        error: (error) => {
          console.error('Error fetching review reports:', error);
        }
      });
  }

  getProfileImageURL(authorId: any): string {
    return `${environment.apiHost}/${ApiPaths.Profile}/${authorId}/profile-image`;
  }

  removeReview(review: ReviewReportDisplay) : void {
    this.reviewReportService.removeReview(review.id)
      .subscribe({
        next: (_) => {
          this.getReviewReports();
          this.sharedService.openSnack("Review approved.");
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
