import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedCommentsGradesComponent } from './reported-comments-grades.component';

describe('ReportedCommentsGradesComponent', () => {
  let component: ReportedCommentsGradesComponent;
  let fixture: ComponentFixture<ReportedCommentsGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportedCommentsGradesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportedCommentsGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
