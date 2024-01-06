import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewReport } from '../shared/models/review-report.model';
import { environment } from '../../env/environment';
import { ApiPaths } from '../shared/api/api-paths.enum';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewReportService {
  private baseUrl = 'http://localhost:8080/api/reports/reviews';

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getReviewReportById(id: number): Observable<ReviewReport> {
    return this.http.get<ReviewReport>(`${environment.apiHost}/${ApiPaths.CommentsGrades}/${id}`);
  }

  getAllReviewReports(): Observable<ReviewReport[]> {
    return this.http.get<ReviewReport[]>(this.baseUrl);
  }

  createReviewReport(reviewId: number): Observable<ReviewReport> {
    let reporterId: number | null = this.accountService.getAccountId(); 
    if (reporterId == null) throw new Error("User is not logged in!");
    return this.http.post<ReviewReport>(this.baseUrl, {
      //date-time without timezone component
      date: new Date().toISOString().slice(0, 19),
      reviewId: reviewId,
      reporterId: reporterId
    });
  }

  updateReviewReport(id: number, dto: any): Observable<ReviewReport> {
    return this.http.put<ReviewReport>(`${this.baseUrl}/${id}`, dto);
  }

  removeReview(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiHost}/${ApiPaths.ReviewReports}/${id}`);
  }
}
