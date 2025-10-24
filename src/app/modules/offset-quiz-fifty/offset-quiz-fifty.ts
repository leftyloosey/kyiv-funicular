import {
  AfterContentInit,
  Component,
  ContentChild,
  DestroyRef,
  inject,
} from '@angular/core';
import { Observable, map, scan, startWith, switchMap, tap } from 'rxjs';
import { TranslateService } from '../../services/translate-service/translate.service';
import { WordWithId } from '../../utils/classes/word';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditWord } from '../../modules/edit-word/edit-word';
import { BasicQuiz } from '../../shared/components/basic-quiz/basic-quiz';
import { OffsetService } from '../../services/offset-service/offset-service';
import {
  getCurrentPage,
  resetPageLimit,
} from '../../utils/functions/functions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QUIZ } from '../../utils/tokens/quizzable';
import { WiktionService } from '../../services/wiktion-service/wiktion-service';
import { SidenavService } from '../../services/sidenav-service/sidenav-service';
@Component({
  selector: 'app-offset-quiz-fifty',
  imports: [AsyncPipe, BasicQuiz],
  templateUrl: './offset-quiz-fifty.html',
  styleUrl: './offset-quiz-fifty.scss',
})
export class OffsetQuizFifty {
  private destroyRef = inject(DestroyRef);
  public output$: Observable<WordWithId[]>;
  // @ContentChild(QUIZ) mood?: BasicQuiz;

  constructor(
    protected sidenav: SidenavService,
    private wiktion: WiktionService,
    private translate: TranslateService,
    private dialog: MatDialog,
    protected offset: OffsetService
  ) {
    this.output$ = this.offset.page$
      .pipe(
        switchMap((page) =>
          this.translate.getNextFiftyWordsOffset(page).pipe(
            tap((words) => {
              this.offset.pageContainerLength = words.firstQueryResults.length;
              this.offset.current = getCurrentPage(
                words,
                this.offset.page$.value
              );
              if (resetPageLimit(words, this.offset.page$.value))
                this.offset.page$.next(0);
            }),
            map((words) => {
              return words.firstQueryResults;
            })
          )
        )
      )
      .pipe(
        switchMap((initialEmployees) =>
          this.offset.offsetActions$.pipe(
            startWith({ word: this.translate.empty, action: 'remove' }),
            scan(
              (acc, curr) => {
                // if (curr.action === 'add') {
                //   return [...acc, curr.word];
                // }
                if (curr.action === 'update') {
                  const newArray = [...initialEmployees];
                  newArray.splice(this.offset.count, 0, curr.word);
                  newArray.splice(this.offset.count + 1, 1);
                  return newArray;
                }
                if (curr.action === 'remove') {
                  return acc.filter((employee) => employee !== curr.word);
                } else {
                  return [...initialEmployees];
                }
              },
              [...initialEmployees]
            )
            // tap((employees) => console.log('', employees[20]))
          )
        )
        // tap((employees) => console.log('shala', employees))
      );
  }

  protected openD(word: WordWithId) {
    // const dialogRef = this.dialog.open(EditWord, {
    //   data: { word },
    // });
    // dialogRef
    //   .afterClosed()
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((result: WordWithId) => {
    //     if (result) {
    //       this.offset.offsetActions$.next({
    //         word: result,
    //         action: 'update',
    //       });
    //     }
    //   });
  }
  protected openEditModal($event: WordWithId) {
    this.wiktion.pushInternalScrape($event);
    this.sidenav.open();
    // this.openD($event);
  }
}
