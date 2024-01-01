import { Injectable } from '@angular/core';
import { ReviewService } from './review.service';
import { Observable } from 'rxjs';
import { Review } from '../shared/models/review.model';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from '../shared/api/api-paths.enum';
import { environment } from '../../env/environment';

@Injectable()
export class HostReviewService extends ReviewService {
  constructor (protected override http: HttpClient) {
    super(http);
  }

  override add(review: Review, hostId: number): Observable<Review> {
    return this.http.post<Review>(`${environment.apiHost}/${ApiPaths.Reviews}/host/${hostId}`, review);
  }
  override getReviews(hostId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiHost}/${ApiPaths.Reviews}/host/${hostId}`);
  }
  override eligibleToReview(hostId: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
