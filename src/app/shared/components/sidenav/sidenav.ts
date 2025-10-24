import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidenavService } from '../../../services/sidenav-service/sidenav-service';
import { WordBuilder } from '../../../modules/word-builder/word-builder';
@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatButtonModule, RouterModule, WordBuilder],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  protected showFiller = true;

  ngAfterViewInit(): void {
    this.sidenav.setSidenav(this.drawer);
  }
  constructor(private sidenav: SidenavService) {}
}
