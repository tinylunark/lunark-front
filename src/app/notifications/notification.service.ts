import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../env/environment';
import { Notification, UnreadNotificationCount } from '../shared/models/notification.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private serverUrl = environment.apiHost + '/socket';
  private stompClient: any;

  isLoaded: boolean = false;
  newNotification$: BehaviorSubject<Notification | UnreadNotificationCount> = new BehaviorSubject<Notification | UnreadNotificationCount>({
    unreadNotificationCount: 0
  });
  newNotificationState = this.newNotification$.asObservable();

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(environment.apiHost + '/notifications').pipe(
      tap(() => {
        this.resetUnreadNotificationCount();
      })
    );
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({Authorization: `Bearer ${localStorage.getItem(environment.userLocalStorageKey)}`}, function () {
      that.isLoaded = true;
      that.openSocket()
    });

  }

  openSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/user/socket-publisher", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  closeSocket() {
    if (this.isLoaded) {
      this.stompClient.disconnect();
      this.isLoaded = false;
      this.resetUnreadNotificationCount();
    }
  }

  handleResult(message: { body: string; }) {
    if (message.body) {
      let notification: Notification | UnreadNotificationCount = JSON.parse(message.body);
      this.newNotification$.next(notification);
      console.log(notification);
    }
  }

  markAsRead(notificationId: number) {
    this.stompClient.send("/socket-subscriber/notification/read", {}, notificationId);
  }

  resetUnreadNotificationCount() {
    this.newNotification$.next({unreadNotificationCount: 0});
  }
}
