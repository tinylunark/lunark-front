import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordSuccessDialogComponent } from './update-password-success-dialog.component';

describe('UpdatePasswordSuccessDialogComponent', () => {
  let component: UpdatePasswordSuccessDialogComponent;
  let fixture: ComponentFixture<UpdatePasswordSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePasswordSuccessDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePasswordSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
