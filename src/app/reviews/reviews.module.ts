import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ReviewRoutingModule } from './reviews-routing.module';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ConfirmDeleteReviewComponent } from './confirm-delete-review/confirm-delete-review.component';
import { ReportedCommentsGradesComponent} from './reported-comments-grades/reported-comments-grades.component';
import { ApproveCommentsGradesComponent } from './approve-comments-grades/approve-comments-grades.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { ReviewsComponent } from './reviews/reviews.component';



@NgModule({
  declarations: [
    ReviewDialogComponent,
    ConfirmDeleteReviewComponent,
    ReportedCommentsGradesComponent,
    ApproveCommentsGradesComponent,
    ReviewCardComponent,
    ReviewsComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    CoreModule,
    ReviewRoutingModule,
  ],
  exports: [
    ReviewDialogComponent,
    ConfirmDeleteReviewComponent,
    ReportedCommentsGradesComponent,
    ApproveCommentsGradesComponent,
    ReviewCardComponent,
    ReviewsComponent
  ]
})
export class ReviewsModule { }
