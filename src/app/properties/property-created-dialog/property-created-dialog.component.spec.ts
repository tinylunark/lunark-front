import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCreatedDialogComponent } from './property-created-dialog.component';

describe('PropertyCreatedDialogComponent', () => {
  let component: PropertyCreatedDialogComponent;
  let fixture: ComponentFixture<PropertyCreatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyCreatedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyCreatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
