import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../env/environment';
import { Notification } from '../shared/models/notification.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private serverUrl = environment.apiHost + '/socket';
  private stompClient: any;

  isLoaded: boolean = false;
  receivedUnreadNotificationCount: boolean = false;
  newNotification?: Notification;
  unreadNotificationCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  unreadNotificationCountState = this.unreadNotificationCount$.asObservable();

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(environment.apiHost + '/notifications');
  }

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
      this.receivedUnreadNotificationCount = false;
      this.unreadNotificationCount$.next(0);
    }
  }

  handleResult(message: { body: string; }) {
    if (!this.receivedUnreadNotificationCount && message.body) {
      let notificationCount: number = JSON.parse(message.body).unreadNotificationCount;
      this.unreadNotificationCount$.next(notificationCount);
      this.receivedUnreadNotificationCount = true;
    }
    else if (message.body) {
      let messageResult: Notification = JSON.parse(message.body);
      this.unreadNotificationCount$.next(Number(this.unreadNotificationCount$.getValue()) + 1);
      this.sharedService.openSnack(messageResult.text);
      console.log(messageResult);
    }
  }
}
