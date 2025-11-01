import { Injectable } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private drawer!: MatDrawer;

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
