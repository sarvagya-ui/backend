import { TestBed } from '@angular/core/testing';

import { HeaderInterceptors } from './header.interceptors';

describe('HeaderService', () => {
  let service: HeaderInterceptors;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderInterceptors);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
