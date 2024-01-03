import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private serverUrl = environment.apiHost + '/socket';
  private stompClient: any;

  isLoaded: boolean = false;

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

  // Funkcija koja se poziva kada server posalje poruku na topic na koji se klijent pretplatio
  handleResult(message: { body: string; }) {
    console.log("Message received:");
    console.log(message);
  }
}
