import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityPricingComponent } from './availability-pricing.component';

describe('AvailabilityPricingComponent', () => {
  let component: AvailabilityPricingComponent;
  let fixture: ComponentFixture<AvailabilityPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailabilityPricingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailabilityPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
