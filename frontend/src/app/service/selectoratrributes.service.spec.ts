import { TestBed } from '@angular/core/testing';

import { SelectoratrributesService } from './selectoratrributes.service';

describe('SelectoratrributesService', () => {
  let service: SelectoratrributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectoratrributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
