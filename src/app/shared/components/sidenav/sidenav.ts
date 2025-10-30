import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidenavService } from '../../../services/sidenav-service/sidenav-service';
import { WordBuilder } from '../../../modules/word-builder/word-builder';
import { LANGUAGE_TOKEN, lngToken } from '../../../utils/tokens/language-token';
import { Subject } from 'rxjs';
import { OffsetService } from '../../../services/offset-service/offset-service';
import { nextPage } from '../../../utils/interfaces/NextPage';
import { LanguageToken } from '../../../services/language-token/language-token';
import { REFRESH } from '../../../utils/tokens/refresh';
import { Refreshable } from '../../../utils/interfaces/Refreshable';
import { LangTargetService } from '../../../services/lang-target-service/lang-target-service';
import { LangDirection } from '../lang-direction/lang-direction';
@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterModule,
    WordBuilder,
    LangDirection,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  // providers: [{ provide: LANGUAGE_TOKEN, useValue: new Subject() }],
})
export class Sidenav implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild(REFRESH) wb?: Refreshable;

  protected showFiller = true;

  ngAfterViewInit(): void {
    this.sidenav.setSidenav(this.drawer);
  }
  constructor(
    @Inject(LANGUAGE_TOKEN) private languageToken: Subject<lngToken>,
    private sidenav: SidenavService,
    protected offset: OffsetService,
    private token: LanguageToken,
    private target: LangTargetService
  ) {}

  private changeTo(target: lngToken) {
    this.target.setTarget(target);
  }

  private changeFrom(tag: lngToken) {
    this.wb?.refreshBuilder();
    this.languageToken.next(tag);
    const sub: nextPage = {
      num: 0,
      token: tag,
    };
    this.offset.page$.next(sub);
  }

  protected fromLanguage(e: lngToken) {
    console.log(e);
    this.changeFrom(e);
  }
  protected toLanguage(e: lngToken) {
    console.log(e);
    this.changeTo(e);
  }
}
