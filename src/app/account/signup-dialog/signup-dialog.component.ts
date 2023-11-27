import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../account.service';
import { Account } from '../model/account.model';
import { SignupSuccessDialog } from '../signup-success-dialog/signup-success-dialog.component';

export const passwordConfrimedValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value != confirmPassword.value
    ? { passwordConfirmed: false }
    : null;
};

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrl: './signup-dialog.component.css'
})
export class SignupDialog {

  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[- +()0-9]+')
    ]),
    role: new FormControl('', [Validators.required])
  }, {
    validators: passwordConfrimedValidator
  });

  constructor(public dialogRef: MatDialogRef<SignupDialog>, private accountService: AccountService, public dialog: MatDialog) { }

  signUp() {
    if(this.signupForm.valid) {
      const newAccount: Account = {
        name: this.signupForm.value.firstName || "",
        surname: this.signupForm.value.lastName || "",
        email: this.signupForm.value.email || "",
        password: this.signupForm.value.password || "",
        address: this.signupForm.value.address || "",
        phoneNumber: this.signupForm.value.phoneNumber || "",
        role: this.signupForm.value.role || "",
        verified: true,
        notificationsEnabled: true,
        blocked: false
      }
      this.accountService.add(newAccount);

      this.dialogRef.close();
      this.dialog.open(SignupSuccessDialog);
    }
  }
}
