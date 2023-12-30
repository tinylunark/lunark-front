import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostIncomingReservationsComponent } from './host-incoming-reservations.component';

describe('HostIncomingReservationsComponent', () => {
  let component: HostIncomingReservationsComponent;
  let fixture: ComponentFixture<HostIncomingReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostIncomingReservationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostIncomingReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
