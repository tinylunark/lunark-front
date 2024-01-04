import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationToastsComponent } from './notification-toasts.component';

describe('NotificationToastsComponent', () => {
  let component: NotificationToastsComponent;
  let fixture: ComponentFixture<NotificationToastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationToastsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
