import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPriceAndAvailabilityEditComponent } from './property-price-and-availability-edit.component';

describe('PropertyPriceAndAvailabilityEditComponent', () => {
  let component: PropertyPriceAndAvailabilityEditComponent;
  let fixture: ComponentFixture<PropertyPriceAndAvailabilityEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyPriceAndAvailabilityEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyPriceAndAvailabilityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
