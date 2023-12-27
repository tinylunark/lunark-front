import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteReviewComponent } from './confirm-delete-review.component';

describe('ConfirmDeleteReviewComponent', () => {
  let component: ConfirmDeleteReviewComponent;
  let fixture: ComponentFixture<ConfirmDeleteReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
