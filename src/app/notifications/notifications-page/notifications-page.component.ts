import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Notification, UnreadNotificationCount, isNotification } from '../../shared/models/notification.model';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.css'
})
export class NotificationsPageComponent implements OnInit {
  notifications: Notification[] = [];
  notificationsEnabled: boolean;

  constructor(private notificationService: NotificationService) { }
  icons: Map<string, string> = new Map<string, string>([
    ['PROPERTY_REVIEW', 'grade'],
    ['HOST_REVIEW', 'workspace_premium'],
    ['RESERVATION_CREATED', 'mail'],
    ['RESERVATION_CANCELED', 'close'],
    ['RESERVATION_ACCEPTED', 'check'],
    ['RESERVATION_REJECTED', 'block'],
  ]);

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe({
      next: (result) => {
        this.notifications = result;
        this.notificationService.newNotificationState.subscribe({
          next: (notification: Notification | UnreadNotificationCount) => {
            if (isNotification(notification)) {
              this.notifications.unshift(notification);
              this.notificationService.markAsRead(notification.id);
              this.notificationService.resetUnreadNotificationCount();
            }
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.getNotificationsEnabled();
  }

  getNotificationsEnabled() {
    this.notificationsEnabled = true;
  }

  onNotificationsEnabledToggle($event: MatSlideToggleChange) {
    console.log(`Checked: ${$event.checked}`);
    this.notificationsEnabled = !this.notificationsEnabled;
  }
}
