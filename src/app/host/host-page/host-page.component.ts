import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Review} from '../../shared/models/review.model';
import {ReviewService} from '../../reviews/review.service';
import {HostReviewService} from '../../reviews/host-review.service';
import {AccountService} from '../../account/account.service';
import {AccountReportService} from '../../account/account-report.service';
import {MatDialog} from '@angular/material/dialog';
import {ReportDialogComponent} from "../../report-dialog/report-dialog.component";

@Component({
  selector: 'app-host-page',
  templateUrl: './host-page.component.html',
  styleUrl: './host-page.component.css',
  providers: [{provide: ReviewService, useClass: HostReviewService}]
})
export class HostPageComponent implements OnInit {
  reviews: Review[] | null = null;
  id: number | null = null;
  header: string = "";
  reportingAllowed = false;
  averageRating: number;
  eligibleToReport: boolean = false;

  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private accountService: AccountService, private accountReportService: AccountReportService, private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id === null) {
        return;
      }

      this.reportingAllowed = this.accountService.getAccountId() === this.id;

      this.reviewService.getReviews(+this.id).subscribe(reviews => {
        this.reviews = reviews;
      });

      this.getAccount();

      this.accountReportService.isEligibleToReportHost(this.id).subscribe(eligible => {
        this.eligibleToReport = eligible;
      });
    });
  }

  public getAccount() {
    if (!this.id) return;

    this.accountService.getAccount(this.id).subscribe(account => {
      this.averageRating = account.averageRating ?? 0.0;
      this.header = `Host reviews for ${account.name} ${account.surname}`;
    });
  }

  report() {
    if (this.id === null) {
      return;
    }

    this.matDialog.open(ReportDialogComponent, {
      backdropClass: "backdropBackground",
      height: "fit-content",
      data: {
        reportedUserId: this.id,
        title: "Report host"
      }
    }).afterClosed().subscribe((reported: boolean) => {
      if (reported) {
        this.eligibleToReport = false;
      }
    });
  }
}
