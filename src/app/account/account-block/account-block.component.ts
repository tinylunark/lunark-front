import { Component, OnInit } from '@angular/core';
import { AccountReport } from '../../shared/models/account-report.model';
import { AccountReportService } from '../../account/account-report.service';
import { ProfileService } from '../../shared/profile.service';
import { SharedService } from '../../shared/shared.service';
import { ReportedAccountDisplay } from './reported-account-display.model';
import { ApiPaths } from '../../shared/api/api-paths.enum';
import { switchMap, map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../../env/environment';
import moment from 'moment';

@Component({
  selector: 'app-account-block',
  templateUrl: './account-block.component.html',
  styleUrl: './account-block.component.css'
})
export class AccountBlockComponent implements OnInit {
  accountReports: ReportedAccountDisplay[] = [];
  placeholderImage = `${environment.assetsDir}/images/placeholder-profile.png`;

  constructor(
    private accountReportService: AccountReportService,
    private profileService: ProfileService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getAccountReports();
  }

  getAccountReports(): void {
    this.accountReportService.getAllAccountReports()
      .pipe(
        switchMap((reports: AccountReport[]) => {
          const requests: Observable<ReportedAccountDisplay>[] = reports.map(report =>
            forkJoin({
              reporter: this.profileService.getProfileById(report.reporterId),
              reported: this.profileService.getProfileById(report.reportedId)
            }).pipe(
              map(({ reporter, reported }) => {
                const displayModel = new ReportedAccountDisplay();
                displayModel.id = report.id;
                displayModel.date = report.date;
                displayModel.reporter = reporter;
                displayModel.reported = reported;
                displayModel.reason = report.reason;
                return displayModel;
              })
            )
          );
          return forkJoin(requests);
        })
      )
      .subscribe({
        next: (data: ReportedAccountDisplay[]) => {
          this.accountReports = data;
        },
        error: (error) => {
          console.error('Error fetching account reports:', error);
        }
      });
  }

  getProfileImageURL(authorId: any): string {
    return `${environment.apiHost}/${ApiPaths.Profile}/${authorId}/profile-image`;
  }

  blockAccount(report: ReportedAccountDisplay) : void {
    this.accountReportService.blockAccount(report.id)
      .subscribe({
        next: (_) => {
          this.getAccountReports();
          this.sharedService.openSnack("Account blocked.");
        }
      })
  }

  handleImageError(event: any): void {
    event.target.src = this.placeholderImage;
  }

  getTimeDifference(reportDate: Date): string {
    const currentDate = moment();
    const reviewDateTime = moment(reportDate);

    const diffInMinutes = currentDate.diff(reviewDateTime, 'minutes');
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = currentDate.diff(reviewDateTime, 'hours');
      if (diffInHours < 24) {
        return `${diffInHours}h ago`;
      } else {
        const diffInDays = currentDate.diff(reviewDateTime, 'days');
        return `${diffInDays}d ago`;
      }
    }
  }

}
