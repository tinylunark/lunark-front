import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AccountReport } from '../shared/models/account-report.model';
import { environment } from '../../env/environment';
import { ApiPaths } from '../shared/api/api-paths.enum';
import { AccountReportDto } from './account-report-dto';
import { AccountService } from './account.service';
import { HostReportEligibility } from './host-report-eligiblity';

@Injectable({
  providedIn: 'root'
})
export class AccountReportService {
  constructor(private http: HttpClient, private accountService: AccountService) { }

  getReviewReportById(id: number): Observable<AccountReport> {
    return this.http.get<AccountReport>(`${environment.apiHost}/${ApiPaths.ReportedAccounts}/${id}`);
  }

  getAllAccountReports(): Observable<AccountReport[]> {
    return this.http.get<AccountReport[]>(`${environment.apiHost}/${ApiPaths.ReportedAccounts}`);
  }
  blockAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiHost}/${ApiPaths.ReportedAccounts}/${id}`);
  }

  reportAccount(id: number, reason: string): Observable<AccountReport> {
    let report: AccountReportDto = {
      reportedId: id,
      date: new Date().toISOString().slice(0, 19),
      reason: reason,
    }
    return this.http.post<AccountReport>(`${environment.apiHost}/${ApiPaths.ReportedAccounts}`, report);
  }

  isEligibleToReportHost(id: number): Observable<boolean> {
    if (this.accountService.getRole() != "GUEST") {
      return new Observable((observer) => {
        observer.next(false);
        observer.complete();
      });
    }
    return this.http.get<HostReportEligibility>(`${environment.apiHost}/${ApiPaths.HostReportEligibility}/${id}`).pipe(
      map((eligibility: HostReportEligibility) => eligibility.eligible)
    );
  }
}
