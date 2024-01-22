import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDialog } from './signup-dialog.component';
import { AccountServiceMock } from '../../mocks/account.service.mock';
import { AccountService } from '../account.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { SharedService } from '../../shared/shared.service';
import { SharedServiceMock } from '../../mocks/shared.service.mock';
import { MaterialModule } from '../../../infrastructure/material/material.module';
import { Account } from '../model/account.model';

describe('SignupDialogComponent', () => {
  let component: SignupDialog;
  let fixture: ComponentFixture<SignupDialog>;
  let matDialog: MatDialog;
  let matDialogRef: MatDialogRef<SignupDialog>;
  let accountServiceSpy: jasmine.Spy<(account: Account) => Observable<Account>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ SignupDialog ],
      providers: [
        {
          provide: AccountService,
          useClass: AccountServiceMock
        },
        {
          provide: SharedService,
          useClass: SharedServiceMock
        },
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj({
              open: jasmine.createSpyObj({
                  afterClosed: of({})
              })
          })
        },
        {
          provide: MatDialogRef<SignupDialog>,
          useValue: jasmine.createSpyObj({
              close: null
          })
        }
        ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'signUp');
    matDialog = TestBed.inject(MatDialog);
    matDialogRef = TestBed.inject(MatDialogRef);
    let accountService = TestBed.inject(AccountService);
    accountServiceSpy = spyOn(accountService, 'signUp').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty form should be invalid', () => {
    component.signupForm.controls['firstName'].setValue('');
    component.signupForm.controls['lastName'].setValue('');
    component.signupForm.controls['email'].setValue('');
    component.signupForm.controls['password'].setValue('');
    component.signupForm.controls['confirmPassword'].setValue('');
    component.signupForm.controls['address'].setValue('');
    component.signupForm.controls['phoneNumber'].setValue('');
    component.signupForm.controls['role'].setValue('');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.signUp).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method', () => {
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.signUp).toHaveBeenCalledTimes(0);
  });

  it('should call signUp method and should be valid and should close itself and open confirmation and upload data', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('test@test.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeTruthy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.signUp).toHaveBeenCalledTimes(1);
      expect(matDialogRef.close).toHaveBeenCalledTimes(1);
      expect(matDialog.open).toHaveBeenCalledTimes(1);
      expect(accountServiceSpy).toHaveBeenCalledTimes(1);
      expect(accountServiceSpy).toHaveBeenCalledWith({
        name: 'Test',
        surname: 'Test',
        email: 'test@test.com',
        password: 'password',
        address: 'Test',
        phoneNumber: '123456789',
        role: 'GUEST',
      });
    });
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if first name is empty', () => {
    component.signupForm.controls['firstName'].setValue('');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('test@test.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if first name contains non-alphanumeric characters', () => {
    component.signupForm.controls['firstName'].setValue('<script>console.log("PWNED")</script>');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('test@test.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if last name is empty', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('');
    component.signupForm.controls['email'].setValue('test@example.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if last name contains non-alphanumeric characters', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('<script>console.log("PWNED")</script>');
    component.signupForm.controls['email'].setValue('test@example.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if the email is empty', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if the email is not a valid email', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('testasdfklj');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if the password is empty', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('test@example.com');
    component.signupForm.controls['password'].setValue('');
    component.signupForm.controls['confirmPassword'].setValue('');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if the password confirmation does not match the password ', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('test@example.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('not-password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if the address is empty', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('test@example.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if the address contains non-alphanumeric characters', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('test@example.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('<script>console.log("PWNED")</script>');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if the phone number is empty', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('test@example.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });


  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if the phone number contains letters', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('test@test.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('12345a6789');
    component.signupForm.controls['role'].setValue('GUEST');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });

  it('should not call signUp method nor be valid nor close itself nor open confirmation dialog if a role is not selected', () => {
    component.signupForm.controls['firstName'].setValue('Test');
    component.signupForm.controls['lastName'].setValue('Test');
    component.signupForm.controls['email'].setValue('test@example.com');
    component.signupForm.controls['password'].setValue('password');
    component.signupForm.controls['confirmPassword'].setValue('password');
    component.signupForm.controls['address'].setValue('Test');
    component.signupForm.controls['phoneNumber'].setValue('123456789');
    component.signupForm.controls['role'].setValue('');

    fixture.detectChanges();
    expect(component.signupForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(component.signUp).toHaveBeenCalledTimes(0);
    expect(matDialogRef.close).toHaveBeenCalledTimes(0);
    expect(matDialog.open).toHaveBeenCalledTimes(0);
    expect(accountServiceSpy).toHaveBeenCalledTimes(0);
  });
});