import { Component, signal } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Word } from '../../../utils/classes/word';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Imperfect } from '../../../shared/components/imperfect/imperfect';
import { Noun } from '../../../shared/components/noun/noun';
import { Wiktion } from '../../wiktion/wiktion';
@Component({
  selector: 'app-newword',
  imports: [ReactiveFormsModule, Imperfect, Noun, Wiktion],
  templateUrl: './newword.html',
  styleUrl: './newword.scss',
})
export class Newword {
  isCaseHidden: boolean = true;
  definitions = signal<string[]>([]);
  examples: string[] = [];
  // examples = signal<string[]>([]);
  word: Word = {
    definitions: [],
    examples: [],
    original: '',
    translation: '',
    partOfSpeech: '',
    case: {},
  };
  submitManualWord() {
    console.log(this.manualForm.value);
  }
  protected manualForm = new FormGroup({
    original: new FormControl(''),
    translation: new FormControl(''),
    partOfSpeech: new FormControl(''),
  });

  constructor(private wiktion: WiktionService) {
    wiktion.newScrapeInternal$
      .pipe(
        takeUntilDestroyed(),
        tap((translatedWord) => {
          if (translatedWord) {
            this.word = translatedWord;
            this.manualForm.patchValue({
              original: this.word.original,
              partOfSpeech: this.word.partOfSpeech,
              translation: this.word.translation,
            });
            this.definitions.set(this.word.definitions);
            this.examples = this.word.examples;
          }
          console.log(this.word);
        })
      )
      .subscribe();
  }

  toggleCase(): void {
    this.isCaseHidden = !this.isCaseHidden; // Set to true to hide
  }
}
