import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoFormComponent } from './info-form.component';
import { Profile } from '../../shared/models/profile.model';
import { profileHost } from '../mocks/profile.mock';

describe('InfoFormComponent', () => {
  let component: InfoFormComponent;
  let fixture: ComponentFixture<InfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update form when profile input is set', () => {
    const profile: Profile = profileHost;
    component.profile = profile;
    component.ngOnChanges();
    expect(component.infoForm.value).toEqual({
      firstName: "Sophia",
      lastName: "Brown",
      email: "user2@example.com",
      phoneNumber: "9876654321",
      address: "456 Cloud St"
    });
  });

  it('should emit validChange when form validity changes', () => {
    spyOn(component.validChange, 'emit');
    const profile: Profile = profileHost;
    component.infoForm.controls['firstName'].setValue(profile.name!);
    component.infoForm.controls['lastName'].setValue(profile.surname!);
    component.infoForm.controls['email'].setValue(profile.email!);
    component.infoForm.controls['phoneNumber'].setValue(profile.phoneNumber!);
    component.infoForm.controls['address'].setValue(profile.address!);
    expect(component.validChange.emit).toHaveBeenCalledWith(true);
  });
});
