import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpdatePasswordErrorDialogComponent } from '../update-password-error-dialog/update-password-error-dialog.component';
import { UpdatePasswordSuccessDialogComponent } from '../update-password-success-dialog/update-password-success-dialog.component';
import PasswordUpdate from "../../shared/models/password-update.model";

export const passwordConfrimedValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');
  return newPassword && confirmPassword && newPassword.value !== confirmPassword.value ? { passwordConfirmed: false } : null;
};

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required, passwordConfrimedValidator]),
  });

 constructor(
    private accountService: AccountService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  updatePassword() {
    if (this.passwordForm.valid) {
      const accountId: any  = this.accountService.getAccountId();

      const passwordData : PasswordUpdate = {
        accountId: accountId ,
        oldPassword: this.passwordForm.value.oldPassword || '',
        newPassword: this.passwordForm.value.newPassword || '',
      };

      this.accountService.updatePassword(passwordData).subscribe({
        next: (_) => {
          const dialogRef = this.matDialog.open(UpdatePasswordSuccessDialogComponent, { backdropClass: 'backdropBackground', });
          dialogRef.afterClosed().subscribe(() => { this.router.navigate(['/profile']); });

        },
        error: (_) => {
          const dialogRef = this.matDialog.open(UpdatePasswordErrorDialogComponent, { backdropClass: 'backdropBackground', });
        }
      });
    }
  }


}
