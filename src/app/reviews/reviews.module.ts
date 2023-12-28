import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ConfirmDeleteReviewComponent } from './confirm-delete-review/confirm-delete-review.component';



@NgModule({
  declarations: [
    ReviewDialogComponent,
    ConfirmDeleteReviewComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    ReviewDialogComponent,
    ConfirmDeleteReviewComponent
  ]
})
export class ReviewsModule { }
