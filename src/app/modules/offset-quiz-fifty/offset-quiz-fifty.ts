import { Component, DestroyRef, Inject, inject } from '@angular/core';
import { Observable, Subject, map, switchMap, tap } from 'rxjs';
import { TranslateService } from '../../services/translate-service/translate.service';
import { WordWithId } from '../../utils/classes/word';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BasicQuiz } from '../../shared/components/basic-quiz/basic-quiz';
import { OffsetService } from '../../services/offset-service/offset-service';
import { WiktionService } from '../../services/wiktion-service/wiktion-service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service';
import { LANGUAGE_TOKEN, lngToken } from '../../utils/tokens/language-token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-offset-quiz-fifty',
  imports: [AsyncPipe, BasicQuiz],
  templateUrl: './offset-quiz-fifty.html',
  styleUrl: './offset-quiz-fifty.scss',
})
export class OffsetQuizFifty {
  private destroyRef = inject(DestroyRef);
  public output$: Observable<WordWithId[]>;
  protected langToken: lngToken = 'uk';

  constructor(
    @Inject(LANGUAGE_TOKEN) private languageToken: Subject<lngToken>,
    protected sidenav: SidenavService,
    private wiktion: WiktionService,
    private translate: TranslateService,
    private dialog: MatDialog,
    protected offset: OffsetService
  ) {
    languageToken
      .pipe(
        takeUntilDestroyed(),
        tap((value) => {
          this.langToken = value;
        })
      )
      .subscribe();

    this.output$ = this.offset.page$.pipe(
      switchMap((page) =>
        this.translate.getNextFiftyWordsOffset(page.num, this.langToken).pipe(
          tap((words) => {
            this.offset.handlePaginate(words, this.langToken);
          }),
          map((words) => {
            return words.firstQueryResults;
          })
        )
      )
    );
  }

  protected openEditModal($event: WordWithId): void {
    this.wiktion.pushInternalScrape($event);
    this.sidenav.open();
  }
}
