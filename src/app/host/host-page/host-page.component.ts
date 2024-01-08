import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Review} from '../../shared/models/review.model';
import {ReviewService} from '../../reviews/review.service';
import {Account} from '../../account/model/account.model';
import {HostReviewService} from '../../reviews/host-review.service';
import {AccountService} from '../../account/account.service';

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

  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private accountService: AccountService) {
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
    });
  }

  public getAccount() {
    if (!this.id) return;

    this.accountService.getAccount(this.id).subscribe(account => {
      this.averageRating = account.averageRating ?? 0.0;
      this.header = `Host reviews for ${account.name} ${account.surname}`;
    });
  }
}
