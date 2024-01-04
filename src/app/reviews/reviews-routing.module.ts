import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from '../account/guard/auth.guard';
import { ApproveCommentsGradesComponent } from './approve-comments-grades/approve-comments-grades.component';

const routes: Routes = [
  { path: 'unapproved-reviews', component: ApproveCommentsGradesComponent, canActivate: [authGuard], data: {role: ['ADMIN'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule { }
