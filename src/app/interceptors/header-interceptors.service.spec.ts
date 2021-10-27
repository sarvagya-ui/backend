import { TestBed } from '@angular/core/testing';

import { HeaderInterceptorsService } from './header-interceptors.service';

describe('HeaderInterceptorsService', () => {
  let service: HeaderInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
