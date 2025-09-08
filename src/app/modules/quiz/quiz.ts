import { Component, inject } from '@angular/core';
import { TranslateService } from '../../services/translate-service/translate.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';
import { QuizCard } from '../../shared/components/quiz-card/quiz-card';
import { Word } from '../../utils/classes/word';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  imports: [QuizCard],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  displayWords: Word[] = [];
  displayWords2: Word[] = [];
  count: number = 0;

  dispObservable$!: Observable<Word[]>;
  private route = inject(ActivatedRoute);

  private routeData$: Observable<any> = this.route.data;

  constructor(private translate: TranslateService) {
    this.routeData$.subscribe((data) => {
      const words: Word[] | undefined = data['words'];
      if (!words) throw new Error('No word');
      this.displayWords2 = words;
    });

    // this.dispObservable$ = translate.getAllWords().pipe(
    //   takeUntilDestroyed(),
    //   tap((words) => {
    //     words;
    //     this.displayWords = words;
    //   })
    // );
  }
  returnCount(enter: number): number {
    if (this.count + enter < 0)
      return (this.count = this.displayWords2.length - 1);
    if (this.count + enter >= this.displayWords2.length)
      return (this.count = 0);

    return (this.count += enter);
  }
}
