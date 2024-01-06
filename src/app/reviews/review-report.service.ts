import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewReport } from '../shared/models/review-report.model';
import { environment } from '../../env/environment';
import { ApiPaths } from '../shared/api/api-paths.enum';

@Injectable({
  providedIn: 'root'
})
export class ReviewReportService {
  constructor(private http: HttpClient) { }

  getReviewReportById(id: number): Observable<ReviewReport> {
    return this.http.get<ReviewReport>(`${environment.apiHost}/${ApiPaths.CommentsGrades}/${id}`);
  }

  getAllReviewReports(): Observable<ReviewReport[]> {
    return this.http.get<ReviewReport[]>(`${environment.apiHost}/${ApiPaths.CommentsGrades}`);
  }

  removeReview(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiHost}/${ApiPaths.CommentsGrades}/${id}`);
  }
}
