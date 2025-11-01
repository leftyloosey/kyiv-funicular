import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WordWithId } from '../../utils/classes/word';
import { lngToken } from '../../utils/tokens/language-token';
import { nextPage } from '../../utils/interfaces/NextPage';

@Injectable({
  providedIn: 'root',
})
export class OffsetService {
  count: number = 0;
  pageContainerLength: number = 0;
  current: string = '';
  quizMode: boolean = true;
  hidelevel: number = 0;

  public offsetActions$ = new Subject<{
    word: WordWithId;
    action: 'add' | 'remove' | 'next' | 'update';
  }>();

  public page$ = new BehaviorSubject<nextPage>({
    num: 0,
    token: 'uk',
  });

  public pageChange(num: number, token: lngToken) {
    const nextPage: number = this.page$.getValue().num + num;
    this.page$.next({ num: nextPage, token: token });
  }

  returnCount(enter: number): number {
    this.hidelevel = 0;
    if (this.count + enter < 0)
      return (this.count = this.pageContainerLength - 1);
    if (this.count + enter >= this.pageContainerLength) return (this.count = 0);

    return (this.count += enter);
  }

  toggleHideLevel() {
    if (this.hidelevel + 1 == 3) {
      this.hidelevel = 0;
      return;
    }
    this.hidelevel += 1;
  }

  moodToggle() {
    if (this.hidelevel >= 2) this.hidelevel = 0;
    this.quizMode = !this.quizMode;
  }
}
