import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile.component';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { ManagementButtonsComponent } from '../management-buttons/management-buttons.component';
import { InfoFormComponent } from '../info-form/info-form.component';
import { ProfileService } from '../../shared/profile.service';
import { AccountService } from '../../account/account.service';
import { SharedService } from '../../shared/shared.service';
import { MaterialModule } from '../../../infrastructure/material/material.module';
import { AccountServiceMock } from '../../mocks/account.service.mock';
import { SharedServiceMock } from '../../mocks/shared.service.mock';
import { ProfileServiceMock } from '../../mocks/profile.service.mock';
import { By } from '@angular/platform-browser';
import { profileHost } from '../mocks/profile.mock';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let profileService: ProfileService;
  let sharedService: SharedService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditProfileComponent,
        BasicInfoComponent,
        InfoFormComponent,
        ManagementButtonsComponent
      ],
      imports: [MaterialModule],
      providers: [
        {
          provide: AccountService,
          useClass: AccountServiceMock
        },
        {
          provide: ProfileService,
          useClass: ProfileServiceMock
        },
        {
          provide: SharedService,
          useClass: SharedServiceMock,
        },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    profileService = TestBed.inject(ProfileService);
    sharedService = TestBed.inject(SharedService);
    accountService = TestBed.inject(AccountService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty InfoForm should make EditProfileComponent invalid', () => {
    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.get('firstName').setValue('');
    infoFormComponent.infoForm.get('lastName').setValue('');
    infoFormComponent.infoForm.get('email').setValue('');
    infoFormComponent.infoForm.get('phoneNumber').setValue('');
    infoFormComponent.infoForm.get('address').setValue('');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('empty firstName should make EditProfileComponent invalid', () => {
    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('');
    infoFormComponent.infoForm.controls['lastName'].setValue('Test');
    infoFormComponent.infoForm.controls['email'].setValue('test@example.com');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('123456789');
    infoFormComponent.infoForm.controls['address'].setValue('Test');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('non-alphanumeric characters in firstName should make EditProfileComponent invalid', () => {
    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('<big_whoopsie>OR1=1');
    infoFormComponent.infoForm.controls['lastName'].setValue('Test');
    infoFormComponent.infoForm.controls['email'].setValue('test@example.com');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('123456789');
    infoFormComponent.infoForm.controls['address'].setValue('Test');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('empty lastName should make EditProfileComponent invalid', () => {
    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('Test');
    infoFormComponent.infoForm.controls['lastName'].setValue('');
    infoFormComponent.infoForm.controls['email'].setValue('test@example.com');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('123456789');
    infoFormComponent.infoForm.controls['address'].setValue('Test');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('non-alphanumeric characters in lastName should make EditProfileComponent invalid', () => {
    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('Test');
    infoFormComponent.infoForm.controls['lastName'].setValue('<big_whoopsie>OR1=1');
    infoFormComponent.infoForm.controls['email'].setValue('test@example.com');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('123456789');
    infoFormComponent.infoForm.controls['address'].setValue('Test');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('empty email should make EditProfileComponent invalid', () => {
    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('Test');
    infoFormComponent.infoForm.controls['lastName'].setValue('Test');
    infoFormComponent.infoForm.controls['email'].setValue('');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('123456789');
    infoFormComponent.infoForm.controls['address'].setValue('Test');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('invalid email should make EditProfileComponent invalid', () => {
    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('Test');
    infoFormComponent.infoForm.controls['lastName'].setValue('Test');
    infoFormComponent.infoForm.controls['email'].setValue('invalidemailaddres@');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('123456789');
    infoFormComponent.infoForm.controls['address'].setValue('Test');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('empty phone should make EditProfileComponent invalid', () => {

    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('Test');
    infoFormComponent.infoForm.controls['lastName'].setValue('Test');
    infoFormComponent.infoForm.controls['email'].setValue('validtest@test,com');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('');
    infoFormComponent.infoForm.controls['address'].setValue('Random Address 1');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('invalid phone should make EditProfileComponent invalid', () => {
    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('Test');
    infoFormComponent.infoForm.controls['lastName'].setValue('Test');
    infoFormComponent.infoForm.controls['email'].setValue('validtest@test,com');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('<big_whoopsie>OR1=1');
    infoFormComponent.infoForm.controls['address'].setValue('Random Address 1');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('empty address should make EditProfileComponent invalid', () => {

    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('Test');
    infoFormComponent.infoForm.controls['lastName'].setValue('Test');
    infoFormComponent.infoForm.controls['email'].setValue('validtest@test.com');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('123456789');
    infoFormComponent.infoForm.controls['address'].setValue('');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('invalid address should make EditProfileComponent invalid', () => {
    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('Test');
    infoFormComponent.infoForm.controls['lastName'].setValue('Test');
    infoFormComponent.infoForm.controls['email'].setValue('validtest@test.com');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('123456789');
    infoFormComponent.infoForm.controls['address'].setValue('<big_whoopsie>OR1=1');

    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('valid form should make EditProfileComponent valid', () => {
    const infoFormComponent = fixture.debugElement.query(By.directive(InfoFormComponent)).componentInstance;

    infoFormComponent.infoForm.controls['firstName'].setValue('Test');
    infoFormComponent.infoForm.controls['lastName'].setValue('Test');
    infoFormComponent.infoForm.controls['email'].setValue('validtest@test,com');
    infoFormComponent.infoForm.controls['phoneNumber'].setValue('123456789');
    infoFormComponent.infoForm.controls['address'].setValue('Test');

    fixture.detectChanges();
    expect(component.valid).toBeTruthy();
  });

  it('onSaveClick should save the profile when valid', fakeAsync(() => {
    const updateProfileSpy = spyOn(profileService, 'updateProfile').and.returnValue(of({}));
    const openSnackSpy = spyOn(sharedService, 'openSnack');
    component.valid = true;
    component.profile = profileHost;

    component.onSaveClick();

    tick();
    expect(updateProfileSpy).toHaveBeenCalledWith(component.profile);
    expect(openSnackSpy).toHaveBeenCalledWith('Profile updated successfully');
  }));


  it('onSaveClick should show a snack message when invalid', fakeAsync(() => {
    const openSnackSpy = spyOn(sharedService, 'openSnack');
    component.valid = false;
    component.onSaveClick();
    tick();
    expect(openSnackSpy).toHaveBeenCalledWith('Please fill in all required fields');
  }));

  it('onSaveClick should show an error message when profile is not found', fakeAsync(() => {
    const consoleErrorSpy = spyOn(console, 'error');
    component.valid = true;
    component.profile = null;
    component.onSaveClick();
    tick();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Profile not found');
  }));
});
