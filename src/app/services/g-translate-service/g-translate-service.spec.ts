import { TestBed } from '@angular/core/testing';

import { GTranslateService } from './g-translate-service';

describe('GTranslateService', () => {
  let service: GTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
