import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ConfirmDeleteReviewComponent } from './confirm-delete-review/confirm-delete-review.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { ReviewsComponent } from './reviews/reviews.component';



@NgModule({
  declarations: [
    ReviewDialogComponent,
    ConfirmDeleteReviewComponent,
    ReviewCardComponent,
    ReviewsComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    ReviewDialogComponent,
    ConfirmDeleteReviewComponent,
    ReviewCardComponent,
    ReviewsComponent
  ]
})
export class ReviewsModule { }
