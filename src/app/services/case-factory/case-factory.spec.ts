import { TestBed } from '@angular/core/testing';

import { CaseFactory } from './case-factory';

describe('CaseFactory', () => {
  let service: CaseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
