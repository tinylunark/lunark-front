import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { EditProfileComponent } from './edit-profile.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let profileService: ProfileService;
  let sharedService: SharedService;
  let accountService: AccountService;

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
});
