import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../shared/models/review.model';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input() review: Review;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() reported: EventEmitter<number> = new EventEmitter<number>();

  accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  onDelete(): void {
    this.deleted.emit(this.review.id);
  }
}
