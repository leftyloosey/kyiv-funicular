import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SidenavService } from '../../services/sidenav-service/sidenav-service';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { loggedIn } from '../constants/log-cookie';

export function SidenavButton(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const sidenav = inject(SidenavService);
  const cookie = inject(CookieService);
  console.log('interceptor hit');
  if (cookie.get(loggedIn)) {
    sidenav.gotCookie.set(true);
    // sidenav.gotCookie = true;
  } else {
    sidenav.gotCookie.set(false);
    // sidenav.gotCookie = false;
  }

  return next(req);
}
