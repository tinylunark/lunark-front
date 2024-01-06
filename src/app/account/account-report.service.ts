import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountReport } from '../shared/models/account-report.model';
import { environment } from '../../env/environment';
import { ApiPaths } from '../shared/api/api-paths.enum';

@Injectable({
  providedIn: 'root'
})
export class AccountReportService {
  constructor(private http: HttpClient) { }

  getReviewReportById(id: number): Observable<AccountReport> {
    return this.http.get<AccountReport>(`${environment.apiHost}/${ApiPaths.ReportedAccounts}/${id}`);
  }

  getAllAccountReports(): Observable<AccountReport[]> {
    return this.http.get<AccountReport[]>(`${environment.apiHost}/${ApiPaths.ReportedAccounts}`);
  }
  blockAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiHost}/${ApiPaths.ReportedAccounts}/${id}`);
  }
}
