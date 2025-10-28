import { TestBed } from '@angular/core/testing';

import { AheadService } from './ahead-service';

describe('AheadService', () => {
  let service: AheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
