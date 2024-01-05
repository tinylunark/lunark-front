import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedService, SnackMessage} from "../shared.service";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent {

  constructor(private snackBar: MatSnackBar, private sharedService: SharedService) {
    this.sharedService.newSnackMessage.subscribe((message: SnackMessage) => {
      if(message.message !== '') {
        this.openSnackBar(message.message, 'OK', message.duration)
      }
    })
  }

  private openSnackBar(message: string, action: string, duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
