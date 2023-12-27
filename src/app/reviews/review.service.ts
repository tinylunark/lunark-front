import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../shared/api/api-paths.enum';
import { PropertyReviewEligibility } from './property-review-eligibility';
import { Observable, of, onErrorResumeNext, map } from 'rxjs';
import { environment } from '../../env/environment';
import { Review } from '../shared/models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  userIsEligibleToReviewProperty(propertyId: number): Observable<boolean> {
      return this.http.get<PropertyReviewEligibility>(`${environment.apiHost}/${ApiPaths.Reviews}/property-review-eligibility/${propertyId}`)
      .pipe(map((eligibility: PropertyReviewEligibility) => eligibility.eligible));
  }

  addPropertyReview(review: Review, propertyId: number): Observable<any> {
    return this.http.post<Review>(`${environment.apiHost}/${ApiPaths.Reviews}/property/${propertyId}`, review);
  }
}
