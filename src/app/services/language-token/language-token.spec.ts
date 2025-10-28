import { TestBed } from '@angular/core/testing';

import { LanguageToken } from './language-token';

describe('LanguageToken', () => {
  let service: LanguageToken;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
