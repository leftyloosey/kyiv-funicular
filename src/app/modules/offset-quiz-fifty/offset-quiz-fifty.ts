import { Component, computed, DestroyRef, Inject, inject } from '@angular/core';
import {
  Observable,
  Subject,
  map,
  scan,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { TranslateService } from '../../services/translate-service/translate.service';
import { WordWithId } from '../../utils/classes/word';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BasicQuiz } from '../../shared/components/basic-quiz/basic-quiz';
import { OffsetService } from '../../services/offset-service/offset-service';
import {
  getCurrentPage,
  resetPageLimit,
} from '../../utils/functions/functions';
import { WiktionService } from '../../services/wiktion-service/wiktion-service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service';
import { LANGUAGE_TOKEN, lngToken } from '../../utils/tokens/language-token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { nextPage } from '../../utils/interfaces/NextPage';
import { LanguageToken } from '../../services/language-token/language-token';
@Component({
  selector: 'app-offset-quiz-fifty',
  imports: [AsyncPipe, BasicQuiz],
  templateUrl: './offset-quiz-fifty.html',
  styleUrl: './offset-quiz-fifty.scss',
  // providers: [{ provide: LANGUAGE_TOKEN, useValue: new Subject() }],
})
export class OffsetQuizFifty {
  private destroyRef = inject(DestroyRef);
  public output$: Observable<WordWithId[]>;
  // protected langToken = computed(() => this.token.getToken());
  protected langToken: lngToken = 'uk';

  constructor(
    @Inject(LANGUAGE_TOKEN) private languageToken: Subject<lngToken>,
    protected sidenav: SidenavService,
    private wiktion: WiktionService,
    private translate: TranslateService,
    private dialog: MatDialog,
    protected offset: OffsetService,
    private token: LanguageToken
  ) {
    languageToken
      .pipe(
        takeUntilDestroyed(),
        tap((value) => {
          this.langToken = value;
          console.log(this.langToken);
        })
      )
      .subscribe();
    // this.langToken = token.getToken();

    this.output$ = this.offset.page$
      .pipe(
        switchMap((page) =>
          this.translate.getNextFiftyWordsOffset(page.num, this.langToken).pipe(
            tap((words) => {
              this.offset.pageContainerLength = words.firstQueryResults.length;
              this.offset.current = getCurrentPage(
                words,
                this.offset.page$.value.num
              );
              const token = this.langToken;
              if (
                words.firstQueryResults.length &&
                resetPageLimit(words, this.offset.page$.value.num)
              )
                this.offset.page$.next({ num: 0, token });
            }),
            map((words) => {
              return words.firstQueryResults;
            })
          )
        )
      )
      .pipe(
        switchMap((initialWords) =>
          this.offset.offsetActions$.pipe(
            startWith({ word: this.translate.empty, action: 'remove' }),
            scan(
              (acc, curr) => {
                if (curr.action === 'update') {
                  const newArray = [...initialWords];
                  newArray.splice(this.offset.count, 0, curr.word);
                  newArray.splice(this.offset.count + 1, 1);
                  return newArray;
                }
                if (curr.action === 'remove') {
                  return acc.filter((word) => word !== curr.word);
                } else {
                  return [...initialWords];
                }
              },
              [...initialWords]
            )
          )
        )
      );
  }

  protected openEditModal($event: WordWithId) {
    this.wiktion.pushInternalScrape($event);
    this.sidenav.open();
  }
}
