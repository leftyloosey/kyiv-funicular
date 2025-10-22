import { TestBed } from '@angular/core/testing';

import { ExampleEdit } from './example-edit';

describe('ExampleEdit', () => {
  let service: ExampleEdit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleEdit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
