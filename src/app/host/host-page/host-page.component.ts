import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../shared/models/review.model';
import { ReviewService } from '../../reviews/review.service';
import { Account } from '../../account/model/account.model';
import { HostReviewService } from '../../reviews/host-review.service';
import { AccountService } from '../../account/account.service';
import { AccountReportService } from '../../account/account-report.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../../report-dialog/report-dialog.component';

@Component({
  selector: 'app-host-page',
  templateUrl: './host-page.component.html',
  styleUrl: './host-page.component.css',
  providers: [{ provide: ReviewService, useClass: HostReviewService }]
})
export class HostPageComponent implements OnInit {
  reviews: Review[] | null = null;
  id: number | null = null;
  averageRating?: number;
  header: string = "";
  reportingAllowed = false;
  eligibleToReport: boolean = false;
  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private accountService: AccountService, private accountReportService: AccountReportService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id === null) {
        return;
      }

      this.reportingAllowed = this.accountService.getAccountId() === this.id;

      this.reviewService.getReviews(+this.id).subscribe(reviews => {
        this.reviews = reviews;
        this.calculateAverageRating();
      });

      this.accountService.getAccount(this.id).subscribe(host => {
        this.header = `Host reviews for ${host.name} ${host.surname}`;
      });

      this.accountReportService.isEligibleToReportHost(this.id).subscribe(eligible => {
        this.eligibleToReport = eligible;
      });
    });
  }

  calculateAverageRating() {
    if (!this.reviews || this.reviews.length <= 0) {
      this.averageRating = undefined;
      return;
    }

    //TODO: Get average rating for host from server (User story 5.3)
    this.averageRating = this.reviews.map(review => review.rating).reduce((a, b) => a + b) / this.reviews.length;
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
