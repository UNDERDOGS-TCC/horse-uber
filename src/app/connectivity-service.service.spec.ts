import { TestBed } from '@angular/core/testing';

import { ConnectivityService } from './connectivity-service.service';

describe('ConnectivityServiceService', () => {
  let service: ConnectivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
