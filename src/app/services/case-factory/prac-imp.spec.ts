import { TestBed } from '@angular/core/testing';

import { PracImp } from './prac-imp';

describe('PracImp', () => {
  let service: PracImp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracImp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
