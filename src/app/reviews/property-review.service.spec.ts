import { TestBed } from '@angular/core/testing';

import { PropertyReviewService } from './property-review.service';

describe('PropertyReviewServiceService', () => {
  let service: PropertyReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
