import { TestBed } from '@angular/core/testing';
import { HttpInterceptor } from '@angular/common/http';

import { JWTInterceptor } from './jwt.interceptor';

describe('JWTInterceptor', () => {
  let interceptor: HttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JWTInterceptor],
    });
    interceptor = TestBed.inject(JWTInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
