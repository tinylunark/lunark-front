import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ReviewRoutingModule } from './reviews-routing.module';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { ConfirmDeleteReviewComponent } from './confirm-delete-review/confirm-delete-review.component';
import { ApproveCommentsGradesComponent } from './approve-comments-grades/approve-comments-grades.component';
import { ReportedCommentsGradesComponent} from './reported-comments-grades/reported-comments-grades.component';


@NgModule({
  declarations: [
    ReviewDialogComponent,
    ConfirmDeleteReviewComponent,
    ReportedCommentsGradesComponent,
    ApproveCommentsGradesComponent,
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
  ]
})
export class ReviewsModule { }
