import { TestBed } from '@angular/core/testing';

import { CaseDelivery } from './case-delivery';

describe('CaseDelivery', () => {
  let service: CaseDelivery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseDelivery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
