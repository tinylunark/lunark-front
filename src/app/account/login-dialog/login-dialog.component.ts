import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import '@material/web/button/filled-button.js';
import { AccountService } from '../account.service';

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
  constructor(public dialogRef: MatDialogRef<LoginDialog>, private accountService: AccountService) { }

  signIn() {
    const email = this.loginForm.value.email || ""; 
    const password = this.loginForm.value.password || "";
    const account = this.accountService.getUser(email, password)
    if(this.loginForm.valid && account) {
      this.dialogRef.close(account);
    }
  }
}
