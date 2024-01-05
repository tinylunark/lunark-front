import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface SnackMessage {
  message: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private snackMessage$ = new BehaviorSubject<SnackMessage>({message: "", duration: 3000});
  newSnackMessage = this.snackMessage$.asObservable();

  constructor() {}

  openSnack(message: string, duration: number = 3000) {
    this.snackMessage$.next({message: message, duration: duration});
  }
}

