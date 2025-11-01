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
  public pageContainerLength: number = 0;
  public pageDisplayString: string = '';
  public quizMode: boolean = true;
  public hidelevel: number = 0;

  public page$ = new BehaviorSubject<nextPage>({
    num: 0,
    token: UK,
  });

  public handlePaginate(words: FirstFifty, langToken: lngToken): void {
    this.setPageSize(words.firstQueryResults.length);
    this.pageDisplayString = this.getCurrentPage(words, this.page$.value.num);
    const token = langToken;
    if (
      words.firstQueryResults.length &&
      this.resetPageLimit(words, this.page$.value.num)
    )
      this.page$.next({ num: 0, token });
  }

  public setPageSize(queryLength: number): void {
    this.pageContainerLength = queryLength;
  }

  public pageChange(num: number, token: lngToken): void {
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

  public getCurrentPage = (word: FirstFifty, value: number): string => {
    const tp = Math.floor(word.totalWords / word.firstQueryResults.length);
    if (value < 0) {
      return tp + (value + 1) + ' / ' + tp;
    } else {
      return value + 1 + ' / ' + tp;
    }
  };

  public resetPageLimit = (word: FirstFifty, page: number): boolean => {
    if (word.totalWords + 50 * (page - 1) < 0) return true;
    if (word.firstQueryResults.length < 50) return true;
    return false;
  };
}
