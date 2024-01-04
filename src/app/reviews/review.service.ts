import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../shared/api/api-paths.enum';
import { Observable} from 'rxjs';
import { environment } from '../../env/environment';
import { Review } from '../shared/models/review.model';

export abstract class ReviewService {

  constructor(protected http: HttpClient) { }

  abstract add(review: Review, reviewableEntityId: number): Observable<Review>;

  getUnapprovedReviews() : Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiHost}/${ApiPaths.Reviews}/${ApiPaths.UnapprovedReviews}`);
  }

  addPropertyReview(review: Review, propertyId: number): Observable<Review> {
    return this.http.post<Review>(`${environment.apiHost}/${ApiPaths.Reviews}/property/${propertyId}`, review);
  }

  abstract getReviews(reviewableEntityId: number): Observable<Review[]>;

  abstract eligibleToReview(reviewableEntityId: number): Observable<boolean>;


  approveReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${environment.apiHost}/${ApiPaths.Reviews}/${review.id}/${ApiPaths.ApproveReview}`, {});
  }

  deleteReview(review: Review): Observable<Review> {
    return this.http.delete<Review>(`${environment.apiHost}/${ApiPaths.Reviews}/${review.id}`, {});
  }

  getReviewById(reviewId: any): Observable<Review> {
    return this.http.get<Review>(`${environment.apiHost}/${ApiPaths.Reviews}/${reviewId}`);
  }

  delete(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiHost}/${ApiPaths.Reviews}/${reviewId}`);
  }
}
