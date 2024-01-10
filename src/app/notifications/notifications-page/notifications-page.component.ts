import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../notification.service';
import {Notification, UnreadNotificationCount, isNotification} from '../../shared/models/notification.model';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {AccountService} from "../../account/account.service";
import {ProfileService} from "../../shared/profile.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import NotificationType from "../../shared/models/notification-type.enum";
import GuestNotificationSettings from "../../shared/models/guest-notification-settings.model";
import HostNotificationSettings from "../../shared/models/host-notification-settings.model";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.css'
})
export class NotificationsPageComponent implements OnInit {
  notifications: Notification[] = [];
  guestNotificationSettings: GuestNotificationSettings;
  hostNotificationSettings: HostNotificationSettings;

  constructor(
    private notificationService: NotificationService,
    public accountService: AccountService,
    private profileService: ProfileService,
  ) {
  }

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
    this.profileService.getProfile()
      .subscribe(profile => {
        this.guestNotificationSettings = profile.guestNotificationSettings!;
        this.hostNotificationSettings = profile.hostNotificationSettings!;
      });
  }

  onNotificationsEnabledToggle($event: MatSlideToggleChange, type: NotificationType) {
    this.accountService.toggleNotificationsEnabled(type)
      .subscribe(account => {
        this.guestNotificationSettings = account.guestNotificationSettings!;
        this.hostNotificationSettings = account.hostNotificationSettings!;
      });
  }

  protected readonly Object = Object;
  protected readonly NotificationType = NotificationType;
}
