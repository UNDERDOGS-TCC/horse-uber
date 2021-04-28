import { TestBed } from '@angular/core/testing';

import { ConnectivityserviceService } from './connectivityservice.service';

describe('ConnectivityserviceService', () => {
  let service: ConnectivityserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectivityserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
