import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AccountService } from '../account.service';
import { Account } from '../model/account.model';
import { SignupSuccessDialog } from '../signup-success-dialog/signup-success-dialog.component';
import { SharedService } from '../../shared/shared.service';

export const passwordConfrimedValidator: ValidatorFn = (
  control: AbstractControl
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
  styleUrl: './signup-dialog.component.css',
})
export class SignupDialog {
  signupForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
        ),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[- +()0-9]+'),
      ]),
      role: new FormControl('', [Validators.required, Validators.pattern('GUEST|HOST')]),
    },
    {
      validators: passwordConfrimedValidator,
    }
  );

  constructor(
    public dialogRef: MatDialogRef<SignupDialog>,
    private sharedService: SharedService,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  signUp() {
    if (this.signupForm.valid) {
      const newAccount: Account = {
        name: this.signupForm.value.firstName || '',
        surname: this.signupForm.value.lastName || '',
        email: this.signupForm.value.email || '',
        password: this.signupForm.value.password || '',
        address: this.signupForm.value.address || '',
        phoneNumber: this.signupForm.value.phoneNumber || '',
        role: this.signupForm.value.role || '',
      };
      this.accountService.signUp(newAccount).subscribe({
        next: () => {
          this.dialogRef.close();
          this.dialog.open(SignupSuccessDialog, {
            backdropClass: 'backdropBackground',
          });
        },
        error: (error) => { 
          console.log(error);
          if(error.status == 400) {
            this.sharedService.openSnack("Another account with this email already exists ❌");
          } else {
            this.sharedService.openSnack("Could not sign up ❌");
          }
        }
      });
    }
  }
}
