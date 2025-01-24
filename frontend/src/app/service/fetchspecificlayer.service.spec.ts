import { TestBed } from '@angular/core/testing';

import { FetchspecificlayerService } from './fetchspecificlayer.service';

describe('FetchspecificlayerService', () => {
  let service: FetchspecificlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchspecificlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
