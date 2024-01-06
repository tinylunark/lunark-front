import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialog } from './login-dialog/login-dialog.component';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { SignupDialog } from './signup-dialog/signup-dialog.component';
import { SignupSuccessDialog } from './signup-success-dialog/signup-success-dialog.component';
import { AccountRoutingModule } from './account-routing.module';
import { VerificationComponent } from './verification/verification.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { AccountBlockComponent } from './account-block/account-block.component';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';


@NgModule({
  declarations: [
    LoginDialog,
    SignupDialog,
    SignupSuccessDialog,
    VerificationComponent,
    ProfileImageComponent,
    AccountBlockComponent,
    ReportDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AccountRoutingModule,
  ],
  exports: [
    LoginDialog,
    SignupDialog,
    ProfileImageComponent,
    AccountBlockComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AccountModule { }
