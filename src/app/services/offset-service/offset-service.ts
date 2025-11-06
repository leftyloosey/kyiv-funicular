import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { lngToken } from '../../utils/tokens/language-token';
import { nextPage } from '../../utils/interfaces/NextPage';
import { FirstFifty } from '../../utils/interfaces/FirstFifty';
import { UK } from '../../utils/constants/lang-types';
@Injectable({
  providedIn: 'root',
})
export class OffsetService {
  public count: number = 0;
  public tempCount: number = 0;
  public pageContainerLength: number = 0;
  public pageDisplayString: string = '';
  public quizMode: boolean = true;
  public hidelevel: number = 0;

  public page$ = new BehaviorSubject<nextPage>({
    num: 0,
    token: UK,
  });

  public handlePaginate(words: FirstFifty, langToken: lngToken): void {
    const receivedWordsTotal = words.firstQueryResults.length;
    const currentPage = this.page$.value.num;

    this.setPageSize(receivedWordsTotal);
    this.pageDisplayString = this.getCurrentPageString(words, currentPage);
    const token = langToken;
    if (
      words.firstQueryResults.length &&
      this.shouldResetPageLimit(words, currentPage, receivedWordsTotal)
    )
      this.page$.next({ num: 0, token });
  }

  public shouldResetPageLimit = (
    word: FirstFifty,
    page: number,
    queryLength: number
  ): boolean => {
    if (word.totalWords + queryLength * (page - 1) < 0) return true;
    if (word.firstQueryResults.length < queryLength) return true;
    return false;
  };

  public getCurrentPageString = (
    word: FirstFifty,
    currentPage: number
  ): string => {
    const tp = Math.floor(word.totalWords / word.firstQueryResults.length);
    if (currentPage < 0) {
      return tp + (currentPage + 1) + ' / ' + tp;
    } else {
      return currentPage + 1 + ' / ' + tp;
    }
  };

  public setPageSize(queryLength: number): void {
    this.pageContainerLength = queryLength;
  }

  public pageChange(num: number, token: lngToken): void {
    this.count = 0;
    const nextPage: number = this.page$.getValue().num + num;
    this.page$.next({ num: nextPage, token: token });
  }

  public navigateLeftRight(enter: number): number {
    this.hidelevel = 0;
    if (this.count + enter < 0)
      return (this.count = this.pageContainerLength - 1);
    if (this.count + enter >= this.pageContainerLength) return (this.count = 0);

    return (this.count += enter);
  }

  public toggleHideLevel(): void {
    if (this.hidelevel + 1 == 3) {
      this.hidelevel = 0;
      return;
    }
    this.hidelevel += 1;
  }

  public moodToggle(): void {
    if (this.hidelevel >= 2) this.hidelevel = 0;
    this.quizMode = !this.quizMode;
  }
}
