import { Injectable, signal } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';
import { CookieService } from 'ngx-cookie-service';
import { loggedIn } from '../../utils/constants/log-cookie';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public gotCookie = signal<boolean>(false);
  private drawer!: MatDrawer;

  constructor(private cookie: CookieService, private router: Router) {
    this.gotCookie.set(cookie.check(loggedIn));
  }
  public logout() {
    this.cookie.deleteAll();
    this.gotCookie.set(false);
    this.router.navigate(['/login']);
  }

  public setSidenav(drawer: MatDrawer): void {
    this.drawer = drawer;
  }

  public open(): Promise<MatDrawerToggleResult> {
    return this.drawer.open();
  }

  public close(): Promise<MatDrawerToggleResult> {
    return this.drawer.close();
  }

  public toggle(): void {
    this.drawer.toggle();
  }
}
