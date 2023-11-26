import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginDialog } from '../../account/login-dialog/login-dialog.component';
import { Account } from '../../account/model/account.model';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  public role: String = "unregistered";

  constructor (public dialog: MatDialog) {

  }
  onAccountClick() {
    // Open login dialog
    const dialogRef = this.dialog.open(LoginDialog,{
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      const account = result as Account;
      console.log(`Logged in as ${account.role}`);
      this.role = account.role;
    });
  }

}
