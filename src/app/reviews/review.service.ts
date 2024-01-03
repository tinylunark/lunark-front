import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../shared/api/api-paths.enum';
import { Observable} from 'rxjs';
import { environment } from '../../env/environment';
import { Review } from '../shared/models/review.model';

export abstract class ReviewService {

  constructor(protected http: HttpClient) { }

  abstract add(review: Review, reviewableEntityId: number): Observable<Review>;

  abstract getReviews(reviewableEntityId: number): Observable<Review[]>;

  abstract eligibleToReview(reviewableEntityId: number): Observable<boolean>;

  delete(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiHost}/${ApiPaths.Reviews}/${reviewId}`);
  }

}
