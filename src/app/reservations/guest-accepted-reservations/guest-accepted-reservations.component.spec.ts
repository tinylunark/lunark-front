import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestAcceptedReservationsComponent } from './guest-accepted-reservations.component';

describe('GuestAcceptedReservationsComponent', () => {
  let component: GuestAcceptedReservationsComponent;
  let fixture: ComponentFixture<GuestAcceptedReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestAcceptedReservationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestAcceptedReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
