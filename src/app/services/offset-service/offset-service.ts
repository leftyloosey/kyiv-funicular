import { Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BasicQuiz } from '../../shared/components/basic-quiz/basic-quiz';
import { WordWithId } from '../../utils/classes/word';
import { Quizzable } from '../../utils/interfaces/Quizzable';
@Injectable({
  providedIn: 'root',
})
export class OffsetService {
  count: number = 0;
  pageContainerLength: number = 0;
  current: string = '';
  quizMode: boolean = true;
  hidelevel: number = 0;

  public page$ = new BehaviorSubject<number>(0);
  public offsetActions$ = new Subject<{
    word: WordWithId;
    action: 'add' | 'remove' | 'next' | 'update';
  }>();
  // @ViewChild(BasicQuiz) quizCard!: Quizzable;

  returnCount(enter: number): number {
    this.hidelevel = 0;
    if (this.count + enter < 0)
      return (this.count = this.pageContainerLength - 1);
    if (this.count + enter >= this.pageContainerLength) return (this.count = 0);

    return (this.count += enter);
  }
  public pageChange(enter: number) {
    this.page$.next(this.page$.getValue() + enter);
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
