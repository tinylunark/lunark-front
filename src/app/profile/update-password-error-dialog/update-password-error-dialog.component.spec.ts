import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordErrorDialogComponent } from './update-password-error-dialog.component';

describe('UpdatePasswordErrorDialogComponent', () => {
  let component: UpdatePasswordErrorDialogComponent;
  let fixture: ComponentFixture<UpdatePasswordErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePasswordErrorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePasswordErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
