import { TestBed } from '@angular/core/testing';

import { FetchspecificvalueService } from './fetchspecificvalue.service';

describe('FetchspecificvalueService', () => {
  let service: FetchspecificvalueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchspecificvalueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
