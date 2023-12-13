import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import '@material/web/button/filled-button.js';
import { AccountService } from '../account.service';
import { SignupDialog } from '../signup-dialog/signup-dialog.component';
import { AuthResponse } from '../model/auth-resposne.model';
import { Router } from '@angular/router';
import { environment } from '../../../env/environment';

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
  constructor(public dialogRef: MatDialogRef<LoginDialog>, private accountService: AccountService, public dialog: MatDialog, private router: Router) { }

  signIn() {
    const email = this.loginForm.value.email || ""; 
    const password = this.loginForm.value.password || "";
    if(this.loginForm.valid) {
      this.accountService.login({email: email, password: password}).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem(environment.userLocalStorageKey, response.accessToken);
          this.accountService.setUser()
          this.router.navigate(['home'])
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
