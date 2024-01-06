import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../shared/models/review.model';
import { AccountService } from '../../account/account.service';
import { environment } from '../../../env/environment';
import { ApiPaths } from '../../shared/api/api-paths.enum';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input() review: Review;
  @Input() reportingAllowed: boolean = false;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() reported: EventEmitter<number> = new EventEmitter<number>();

  accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  onDelete(): void {
    this.deleted.emit(this.review.id);
  }

  onReport(): void {
    this.reported.emit(this.review.id);
  }

  getProfileImageURL(): string {
    return `${environment.apiHost}/${ApiPaths.Profile}/${this.review.authorId}/profile-image`;
  }
}
