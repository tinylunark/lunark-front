import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../shared/models/review.model';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input() review: Review;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  onDelete(): void {
    this.deleted.emit(this.review.id);
  }
}
