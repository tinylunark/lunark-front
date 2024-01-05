import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCommentsGradesComponent } from './approve-comments-grades.component';

describe('ApproveCommentsGradesComponent', () => {
  let component: ApproveCommentsGradesComponent;
  let fixture: ComponentFixture<ApproveCommentsGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveCommentsGradesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveCommentsGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
