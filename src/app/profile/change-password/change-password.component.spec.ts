import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { AccountService } from '../../account/account.service';
import { AccountServiceMock } from '../../mocks/account.service.mock';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../infrastructure/material/material.module';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UpdatePasswordErrorDialogComponent } from '../update-password-error-dialog/update-password-error-dialog.component';
import { UpdatePasswordSuccessDialogComponent } from '../update-password-success-dialog/update-password-success-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let accountService: AccountService;
  let router: Router;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChangePasswordComponent,
        UpdatePasswordErrorDialogComponent,
        UpdatePasswordSuccessDialogComponent,
      ],
      imports: [MaterialModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule],
      providers: [
        {
          provide: AccountService,
          useClass: AccountServiceMock,
        }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update password successfully', () => {
    const updatePasswordSpy = spyOn(accountService, 'updatePassword').and.returnValue(of({}));
    const dialogRefSpy = spyOn(matDialog, 'open').and.returnValue({
      afterClosed: () => of({}),
    } as any);
    const navigateSpy = spyOn(router, 'navigate');

    component.passwordForm.setValue({
      oldPassword: 'oldPassword',
      newPassword: 'newPassword',
      confirmPassword: 'newPassword',
    });

    component.updatePassword();

    expect(updatePasswordSpy).toHaveBeenCalled();
    expect(dialogRefSpy).toHaveBeenCalledWith(UpdatePasswordSuccessDialogComponent, {
      backdropClass: 'backdropBackground',
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/profile']);
  });

  it('should not call updatePassword when form is invalid', () => {
    component.passwordForm.setValue({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    expect(component.passwordForm.valid).toBeFalsy();
  });
});
