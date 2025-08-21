import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '../../services/translate-service/translate.service';
import { Subject } from 'rxjs';
import { translatable } from './translatable';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-translate',
  imports: [ReactiveFormsModule],
  templateUrl: './translate.html',
  styleUrl: './translate.scss',
})
export class Translate {
  protected displayWords = signal<translatable[]>([]);
  public wordDelivery$ = new Subject<string>();
  // public pushWord = this.wordSubject$.asObservable();
  private translate = inject(TranslateService);
  protected translateForm = new FormGroup({
    word: new FormControl(''),
  });

  constructor() {
    this.getWordsFromBackend();
    this.wordDelivery$
      .pipe(takeUntilDestroyed())
      .subscribe((toBeTranslated) => {
        this.translate
          .translateOne(toBeTranslated as string)
          .subscribe((translatedWord) => {
            this.displayWords.update((existingWords) => [
              translatedWord,
              ...existingWords,
            ]);
          });
      });
  }

  public pushTranslate(word: string) {
    this.wordDelivery$.next(word);
  }

  protected submitTranslateWord() {
    const { word } = this.translateForm.value;
    this.pushTranslate(word as string);
    this.translateForm.reset();
  }

  protected getWordsFromBackend() {
    this.translate.getAllWords().subscribe((words) => {
      words.reverse();
      return this.displayWords.set(words);
    });
  }
}
