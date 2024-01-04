import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import '@material/web/button/filled-button.js';
import { AccountService } from '../account.service';
import { SignupDialog } from '../signup-dialog/signup-dialog.component';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { NotificationService } from '../../notifications/notification.service';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialog {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(public dialogRef: MatDialogRef<LoginDialog>, private accountService: AccountService, public dialog: MatDialog, private router: Router, private sharedService: SharedService, private notificationService: NotificationService) { }

  signIn() {
    const email = this.loginForm.value.email || ""; 
    const password = this.loginForm.value.password || "";
    if(this.loginForm.valid) {
      this.accountService.login({email: email, password: password}).subscribe({
        next: () => {
          this.router.navigate(['home'])
          this.dialogRef.close();
        },
        error: () => {
          this.sharedService.openSnack("Wrong email or password!");
        } 
      });
    }
  }

  openSignUpDialog() {
    const signUpDialogRef = this.dialog.open(SignupDialog, {
      width: "40%",
      backdropClass: "backdropBackground"
    });
  }
}
