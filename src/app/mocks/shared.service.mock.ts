import { Injectable } from "@angular/core";

@Injectable()
export class SharedServiceMock {
  constructor() {}

  openSnack(message: string, duration: number = 3000) {
    console.log(message, duration);
  }
}