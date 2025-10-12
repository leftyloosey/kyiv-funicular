import { TestBed } from '@angular/core/testing';

import { TopFormService } from './top-form-service';

describe('TopFormService', () => {
  let service: TopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
