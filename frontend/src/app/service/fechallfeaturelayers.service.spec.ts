import { TestBed } from '@angular/core/testing';

import { FechallfeaturelayersService} from './fechallfeaturelayers.service';

describe('FechallfeaturelayersService', () => {
  let service: FechallfeaturelayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FechallfeaturelayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
