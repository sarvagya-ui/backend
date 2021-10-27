import { TestBed } from '@angular/core/testing';

import { ResponseInterceptorsService } from './response-interceptors.service';

describe('ResponseInterceptorsService', () => {
  let service: ResponseInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
