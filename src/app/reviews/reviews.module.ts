import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';



@NgModule({
  declarations: [
    ReviewDialogComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [
    ReviewDialogComponent
  ]
})
export class ReviewsModule { }
