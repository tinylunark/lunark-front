import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuccessDialog } from './signup-success-dialog.component';

describe('SignupSuccessDialog', () => {
  let component: SignupSuccessDialog;
  let fixture: ComponentFixture<SignupSuccessDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupSuccessDialog]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupSuccessDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
