import { TestBed } from '@angular/core/testing';

import { ExtraFactory } from './extra-factory';

describe('ExtraFactory', () => {
  let service: ExtraFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
