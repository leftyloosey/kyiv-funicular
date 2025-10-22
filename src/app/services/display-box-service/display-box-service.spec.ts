import { TestBed } from '@angular/core/testing';

import { DisplayBoxService } from './display-box-service';

describe('DisplayBoxService', () => {
  let service: DisplayBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
