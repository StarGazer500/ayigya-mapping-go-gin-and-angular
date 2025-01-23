import { TestBed } from '@angular/core/testing';

import { SelectoroperatorsService } from './selectoroperators.service';

describe('SelectoroperatorsService', () => {
  let service: SelectoroperatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectoroperatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
