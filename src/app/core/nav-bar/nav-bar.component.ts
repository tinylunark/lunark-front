import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialog } from '../../account/login-dialog/login-dialog.component';
import { AccountService } from '../../account/account.service';
import { environment } from '../../../env/environment';
import { NotificationService } from '../../notifications/notification.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  public role: String = "unregistered";
  public activeLink: String = "home";
  public unreadNotificationCount: number = 0;
  public hideNotificationCount: boolean = true;

  constructor (public dialog: MatDialog, public router: Router, private accountService: AccountService, private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    if (this.accountService.isLoggedIn()) {
      this.notificationService.initializeWebSocketConnection();
    }
    this.accountService.userState.subscribe((result) => {
      this.role = result;
    });
    this.notificationService.unreadNotificationCountState.subscribe((result) => {
      this.unreadNotificationCount = result;
      this.hideNotificationCount = this.unreadNotificationCount == 0;
      console.log("Updated navbar");
    });
  }

  onLogoutClick() {
    this.accountService.logout().subscribe({
      next: () => {
        localStorage.removeItem(environment.userLocalStorageKey);
        this.accountService.setUser();
      }
    });
  }

  openLoginDialog() {
    // Open login dialog
    const dialogRef = this.dialog.open(LoginDialog,{
      width: "40%",
      backdropClass: "backdropBackground"
    });
  }
}
