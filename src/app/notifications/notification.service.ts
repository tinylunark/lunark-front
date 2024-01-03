import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../env/environment';
import { Notification } from '../shared/models/notification.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private serverUrl = environment.apiHost + '/socket';
  private stompClient: any;

  isLoaded: boolean = false;
  receivedUnreadNotificationCount: boolean = false;
  notifications: Notification[] = [];
  unreadNotificationCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  unreadNotificationCountState = this.unreadNotificationCount$.asObservable();

  constructor() { }

  // Funkcija za otvaranje konekcije sa serverom
  initializeWebSocketConnection() {
    // serverUrl je vrednost koju smo definisali u registerStompEndpoints() metodi na serveru
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
    }
  }

  handleResult(message: { body: string; }) {
    if (!this.receivedUnreadNotificationCount && message.body) {
      let notificationCount: number = JSON.parse(message.body).unreadNotificationCount;
      this.unreadNotificationCount$.next(notificationCount);
      this.receivedUnreadNotificationCount = true;
      console.log(notificationCount);
    }
    else if (message.body) {
      let messageResult: Notification = JSON.parse(message.body);
      console.log(messageResult);
    }
  }
}
