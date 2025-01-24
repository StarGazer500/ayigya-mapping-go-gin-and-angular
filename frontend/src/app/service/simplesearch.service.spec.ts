import { TestBed } from '@angular/core/testing';

import { SimplesearchService } from './simplesearch.service';

describe('SimplesearchService', () => {
  let service: SimplesearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimplesearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
