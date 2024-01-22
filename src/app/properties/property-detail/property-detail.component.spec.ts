import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PropertyDetailComponent} from './property-detail.component';
import {PropertyService} from "../property.service";
import {PropertyServiceMock} from "../property.service.mock";
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {MaterialModule} from "../../../infrastructure/material/material.module";
import {ReservationService} from "../../reservation.service";
import {ReservationServiceMock} from "../../reservation.service.mock";
import {AccountService} from "../../account/account.service";
import {AccountServiceMock} from "../../account/account.service.mock";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

describe('PropertyDetailComponent', () => {
  let component: PropertyDetailComponent;
  let fixture: ComponentFixture<PropertyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [PropertyDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({id: 1})}}},
        {provide: PropertyService, useClass: PropertyServiceMock},
        {provide: ReservationService, useClass: ReservationServiceMock},
        {provide: AccountService, useClass: AccountServiceMock},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid', () => {
    component.reservationFormGroup.setValue({
      "startDate": '',
      "endDate": '',
      "numberOfGuests": '',
    });
    expect(component.reservationFormGroup.controls['numberOfGuests'].valid).toBeTruthy();
  });

  it('should be invalid', () => {
    component.reservationFormGroup.setValue({
      "startDate": '',
      "endDate": '',
      "numberOfGuests": '',
    });
    expect(component.reservationFormGroup.invalid).toBeTruthy();
  });
});
