import { TestBed } from '@angular/core/testing';

import { SelectorfeaturlayersService } from './selectorfeaturlayers.service';

describe('SelectorfeaturlayersService', () => {
  let service: SelectorfeaturlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectorfeaturlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
