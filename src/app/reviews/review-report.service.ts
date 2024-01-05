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
  private baseUrl = 'http://localhost:8080/api/reports/reviews';

  constructor(private http: HttpClient) { }

  getReviewReportById(id: number): Observable<ReviewReport> {
    return this.http.get<ReviewReport>(`${this.baseUrl}/${id}`);
  }

  getAllReviewReports(): Observable<ReviewReport[]> {
    return this.http.get<ReviewReport[]>(this.baseUrl);
  }

  createReviewReport(dto: any): Observable<ReviewReport> {
    return this.http.post<ReviewReport>(this.baseUrl, dto);
  }

  updateReviewReport(id: number, dto: any): Observable<ReviewReport> {
    return this.http.put<ReviewReport>(`${this.baseUrl}/${id}`, dto);
  }

  removeReview(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiHost}/${ApiPaths.ReviewReports}/${id}`);
  }
}
