import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Notification, UnreadNotificationCount, isNotification } from '../../shared/models/notification.model';

@Component({
  selector: 'app-notification-toasts',
  templateUrl: './notification-toasts.component.html',
  styleUrl: './notification-toasts.component.css'
})
export class NotificationToastsComponent {

  notifications: Notification[] = [];

  constructor (private notificationService: NotificationService) { 
    this.notificationService.newNotificationState.subscribe((notification: Notification | UnreadNotificationCount) => {
      if (isNotification(notification)) {
        this.notifications.unshift(notification);
        setTimeout(() => {
          this.notifications.pop();
        }, 5000);
      }
    });
  }

}
