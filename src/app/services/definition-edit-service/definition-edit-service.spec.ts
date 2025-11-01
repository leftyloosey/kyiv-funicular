import { TestBed } from '@angular/core/testing';

import { DefinitionEditService } from './definition-edit-service';

describe('DefinitionEditService', () => {
  let service: DefinitionEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinitionEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
