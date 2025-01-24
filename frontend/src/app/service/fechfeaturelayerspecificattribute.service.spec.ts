import { TestBed } from '@angular/core/testing';

import { FechfeaturelayerspecificattributeService } from './fechfeaturelayerspecificattribute.service';

describe('GfechfeaturelayerspecificattributeService', () => {
  let service: FechfeaturelayerspecificattributeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechfeaturelayerspecificattributeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
