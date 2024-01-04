import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { RelativeTimeFilterPipe } from './relative-time-filter.pipe';
import { NotificationCardComponent } from './notification-card/notification-card.component';



@NgModule({
  declarations: [
    NotificationsPageComponent,
    RelativeTimeFilterPipe,
    NotificationCardComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    CoreModule,
    MaterialModule
  ],
  exports: [
    NotificationsPageComponent,
    NotificationCardComponent
  ]
})
export class NotificationsModule { }
