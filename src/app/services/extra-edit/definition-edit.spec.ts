import { TestBed } from '@angular/core/testing';

import { DefinitionEdit } from './definition-edit';

describe('DefinitionEdit', () => {
  let service: DefinitionEdit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinitionEdit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
