import { TestBed } from '@angular/core/testing';

import { LangTargetService } from './lang-target-service';

describe('LangTargetService', () => {
  let service: LangTargetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LangTargetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
