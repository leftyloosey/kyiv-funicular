import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profileGuard as profileGuardGuard } from './profile-guard-guard';

describe('profileGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => profileGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
