import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PropertyReviewEligibility } from './property-review-eligibility';
import { environment } from '../../env/environment';
import { ApiPaths } from '../shared/api/api-paths.enum';
import { Review } from '../shared/models/review.model';
import { ReviewService } from './review.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PropertyReviewService extends ReviewService {

  constructor(protected override http: HttpClient) {
    super(http);
   }

  eligibleToReview(propertyId: number): Observable<boolean> {
      return this.http.get<PropertyReviewEligibility>(`${environment.apiHost}/${ApiPaths.Reviews}/property-review-eligibility/${propertyId}`)
      .pipe(map((eligibility: PropertyReviewEligibility) => eligibility.eligible));
  }

  add(review: Review, propertyId: number): Observable<Review> {
    return this.http.post<Review>(`${environment.apiHost}/${ApiPaths.Reviews}/property/${propertyId}`, review);
  }

  getReviews(hostId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiHost}/${ApiPaths.Reviews}/property/${hostId}`);
  }
}
