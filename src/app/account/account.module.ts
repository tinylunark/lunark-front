import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialog } from './login-dialog/login-dialog.component';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupDialog } from './signup-dialog/signup-dialog.component';



@NgModule({
  declarations: [
    LoginDialog,
    SignupDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
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
