import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginDialog } from '../../account/login-dialog/login-dialog.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor (public dialog: MatDialog) {

  }
  onAccountClick() {
    // Open login dialog
    const dialogRef = this.dialog.open(LoginDialog,{
      width: '40%'
    });
  }

}
