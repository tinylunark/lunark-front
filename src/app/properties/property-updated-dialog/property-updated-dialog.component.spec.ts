import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUpdatedDialogComponent } from './property-updated-dialog.component';

describe('PropertyUpdatedDialogComponent', () => {
  let component: PropertyUpdatedDialogComponent;
  let fixture: ComponentFixture<PropertyUpdatedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyUpdatedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyUpdatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
