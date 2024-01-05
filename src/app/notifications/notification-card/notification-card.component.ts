import { Component, Input } from '@angular/core';
import { Notification } from '../../shared/models/notification.model';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css'
})
export class NotificationCardComponent {
  @Input() notification: Notification;
  @Input() displayReadIndicator: boolean = true;
  icons: Map<string, string> = new Map<string, string>([
    ['PROPERTY_REVIEW', 'grade'],
    ['HOST_REVIEW', 'workspace_premium'],
    ['RESERVATION_CREATED', 'mail'],
    ['RESERVATION_CANCELED', 'close'],
    ['RESERVATION_ACCEPTED', 'check'],
    ['RESERVATION_REJECTED', 'block'],
  ]);

  constructor() { }
}
