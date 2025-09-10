import { Component, inject, signal } from '@angular/core';
import { TranslateService } from '../../services/translate-service/translate.service';
import { Observable } from 'rxjs';
import { QuizCard } from '../../shared/components/quiz-card/quiz-card';
import { WordWithId } from '../../utils/classes/word';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditWord } from '../edit-word/edit-word';
@Component({
  selector: 'app-quiz',
  imports: [QuizCard],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  displayWords3 = signal<WordWithId[]>([]);
  count: number = 0;
  // dispObservable$!: Observable<Word[]>;
  dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);

  private routeData$: Observable<any> = this.route.data;

  constructor(private translate: TranslateService) {
    this.routeData$.subscribe((data) => {
      const words: WordWithId[] | undefined = data['words'];
      if (!words) throw new Error('No word');
      this.displayWords3.set(words);
    });
    // this.dispObservable$ = translate.getAllWords().pipe(
    //   takeUntilDestroyed(),
    //   tap((words) => {
    //     words;
    //     this.displayWords = words;
    //   })
    // );
  }
  openD() {
    const dialogRef = this.dialog.open(EditWord, {
      data: { word: this.displayWords3()[this.count] },
    });
    dialogRef.afterClosed().subscribe((result: WordWithId) => {
      if (result) {
        this.displayWords3.update((currentItems) => {
          const newArray = [...currentItems];
          newArray.splice(this.count, 0, result);
          newArray.splice(this.count + 1, 1);
          return newArray;
        });
      }
    });
  }
  returnCount(enter: number): number {
    if (this.count + enter < 0)
      return (this.count = this.displayWords3().length - 1);
    if (this.count + enter >= this.displayWords3().length)
      return (this.count = 0);

    return (this.count += enter);
  }
}
