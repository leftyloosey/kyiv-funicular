import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private drawer!: MatDrawer;
  // private sidenav!: MatSidenav;

  public setSidenav(drawer: MatDrawer) {
    console.log(drawer);
    console.log(this.drawer);
    this.drawer = drawer;
    // this.sidenav = sidenav;
  }

  public open() {
    return this.drawer.open();
  }

  public close() {
    return this.drawer.close();
  }

  public toggle(): void {
    this.drawer.toggle();
  }
}
