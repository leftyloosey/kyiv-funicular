import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/auth.service';

export const logGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // console.log('route and state!', route, state);
  if (!authService.checkAuthentication()) {
    console.log(
      'did it hit the guard? - auth false branch',
      authService.checkAuthentication()
    );

    const loginPath = router.parseUrl('/login');
    return new RedirectCommand(loginPath, {
      skipLocationChange: true,
    });
  }

  console.log(
    'did it hit the guard? - auth true branch',
    authService.checkAuthentication()
  );
  return true;
};
