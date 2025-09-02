import { TestBed } from '@angular/core/testing';

import { WiktionService } from './wiktion-service';

describe('WiktionService', () => {
  let service: WiktionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WiktionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
