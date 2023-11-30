import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialog } from '../../account/login-dialog/login-dialog.component';
import { Account } from '../../account/model/account.model';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  public role: String = "unregistered";
  public activeLink: String = "home";

  constructor (public dialog: MatDialog, public router: Router) {

  }

  onLogoutClick() {
    this.role = "unregistered";
  }

  openLoginDialog() {
    // Open login dialog
    const dialogRef = this.dialog.open(LoginDialog,{
      width: "40%",
      backdropClass: "backdropBackground"
    });
    dialogRef.afterClosed().subscribe(result => {
      const account = result as Account;
      if (!account) {
        return;
      }
      this.role = account.role;
    });
  }
}
