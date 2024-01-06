import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { authGuard } from '../account/guard/auth.guard';



const routes: Routes = [
  { path: 'notifications', component: NotificationsPageComponent, canActivate: [authGuard], data: {role: ['GUEST', 'HOST'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule { }
