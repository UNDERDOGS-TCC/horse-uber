import { TestBed } from '@angular/core/testing';

import { ConnectivityServiceService } from './connectivity-service.service';

describe('ConnectivityServiceService', () => {
  let service: ConnectivityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectivityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
