import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from '../account/guard/auth.guard';
import { ReportedCommentsGradesComponent } from './reported-comments-grades/reported-comments-grades.component';
import { ApproveCommentsGradesComponent } from './approve-comments-grades/approve-comments-grades.component';

const routes: Routes = [
  { path: 'comments-and-grades', component: ReportedCommentsGradesComponent, canActivate: [authGuard], data: {role: ['ADMIN'] } },
  { path: 'unapproved-reviews', component: ApproveCommentsGradesComponent, canActivate: [authGuard], data: {role: ['ADMIN'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule { }
