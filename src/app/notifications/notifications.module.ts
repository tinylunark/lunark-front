import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { RelativeTimeFilterPipe } from './relative-time-filter.pipe';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { NotificationToastsComponent } from './notification-toasts/notification-toasts.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";



@NgModule({
  declarations: [
    NotificationsPageComponent,
    RelativeTimeFilterPipe,
    NotificationCardComponent,
    NotificationToastsComponent
  ],
    imports: [
        CommonModule,
        NotificationsRoutingModule,
        CoreModule,
        MaterialModule,
        MatSlideToggleModule
    ],
  exports: [
    NotificationsPageComponent,
    NotificationCardComponent,
    NotificationToastsComponent
  ]
})
export class NotificationsModule { }
