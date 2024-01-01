import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../shared/models/review.model';
import { ReviewService } from '../../reviews/review.service';
import { Account } from '../../account/model/account.model';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-host-page',
  templateUrl: './host-page.component.html',
  styleUrl: './host-page.component.css'
})
export class HostPageComponent implements OnInit {
  reviews: Review[] = [];
  host: Account | null = null;
  constructor(private route: ActivatedRoute, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id === null) {
        return;
      }

      this.reviewService.getReviewsForHost(+id).subscribe(reviews => {
        this.reviews = reviews;
      });

    });
  }

}
