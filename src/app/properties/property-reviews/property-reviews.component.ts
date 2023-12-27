import { Component, Input } from '@angular/core';
import { Review } from '../../shared/models/review.model';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-property-reviews',
  templateUrl: './property-reviews.component.html',
  styleUrl: './property-reviews.component.css'
})
export class PropertyReviewsComponent {
  @Input() reviews: Review[] = [];

  constructor(private accountService: AccountService) {
  } 

  userIsEligibleToReview(): boolean {
    return this.accountService.getRole() === 'GUEST';
  }
}
