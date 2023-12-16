import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialog } from './login-dialog/login-dialog.component';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { SignupDialog } from './signup-dialog/signup-dialog.component';
import { SignupSuccessDialog } from './signup-success-dialog/signup-success-dialog.component';



@NgModule({
  declarations: [
    LoginDialog,
    SignupDialog,
    SignupSuccessDialog,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoginDialog,
    SignupDialog
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AccountModule { }
