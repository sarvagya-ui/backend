import { TestBed } from '@angular/core/testing';

import { ResponseInterceptors } from './response.interceptors';

describe('ResponseInterceptors', () => {
  let service: ResponseInterceptors;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseInterceptors);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
