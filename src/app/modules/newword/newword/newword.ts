import { Component, signal } from '@angular/core';
import { tap } from 'rxjs';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Word, WordCase } from '../../../utils/classes/word';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Imperfect } from '../../../shared/components/imperfect/imperfect';
import { Noun } from '../../../shared/components/noun/noun';
import { Wiktion } from '../../wiktion/wiktion';
import { Adjective } from '../../../shared/components/adjective/adjective';
@Component({
  selector: 'app-newword',
  imports: [ReactiveFormsModule, Imperfect, Noun, Wiktion, Adjective],
  templateUrl: './newword.html',
  styleUrl: './newword.scss',
})
export class Newword {
  isCaseHidden: boolean = true;
  isCaseButtonHidden: boolean = false;
  definitions = signal<string[]>([]);
  examples = signal<string[]>([]);
  word: Word = {
    definitions: [],
    examples: [],
    original: '',
    translation: '',
    partOfSpeech: '',
    case: {},
  };

  protected manualForm = new FormGroup({
    original: new FormControl(''),
    translation: new FormControl(''),
    partOfSpeech: new FormControl(''),
  });
  protected addDefinition = new FormGroup({
    definition: new FormControl(''),
  });
  protected addExample = new FormGroup({
    example: new FormControl(''),
  });

  submitManualWord() {
    this.word.original = this.manualForm.value.original as string;
    this.word.translation = this.manualForm.value.translation as string;
    this.word.partOfSpeech = this.manualForm.value.partOfSpeech as string;
  }
  onSendUp($event: WordCase) {
    this.word.case = $event;
  }

  submitDefinition() {
    this.definitions.update((prev) => [
      ...prev,
      this.addDefinition.value.definition as string,
    ]);
    this.word.definitions.push(this.addDefinition.value.definition as string);
    this.addDefinition.reset();
  }
  submitExample() {
    this.examples.update((prev) => [
      ...prev,
      this.addExample.value.example as string,
    ]);
    this.word.examples.push(this.addExample.value.example as string);
    this.addExample.reset();
  }

  definitionEdit(e: Event) {
    e.preventDefault();
    const pop = this.definitions().pop();
    this.definitions.update((currentItems) =>
      currentItems.filter((item) => pop !== item)
    );

    this.addDefinition.controls.definition.setValue(pop as string);
  }
  exampleEdit(e: Event) {
    e.preventDefault();
    const pop = this.examples().pop();
    this.examples.update((currentItems) =>
      currentItems.filter((item) => pop !== item)
    );

    this.addExample.controls.example.setValue(pop as string);
  }
  seeWord(e: Event) {
    this.word.original = this.manualForm.value.original as string;
    this.word.translation = this.manualForm.value.translation as string;
    this.word.partOfSpeech = this.manualForm.value.partOfSpeech as string;

    if (window.confirm(JSON.stringify(this.word))) {
      this.wiktion.saveNewWord(this.word).subscribe();

      this.reset(e);
    } else {
      console.log('cancelled.');
    }
  }
  constructor(private wiktion: WiktionService) {
    wiktion.newScrapeInternal$
      .pipe(
        takeUntilDestroyed(),
        tap((translatedWord) => {
          if (translatedWord) {
            this.word = translatedWord;
            switch (translatedWord.partOfSpeech) {
              case 'Noun':
                this.word.partOfSpeech = 'Noun';
                break;
              case 'Adjective':
                this.word.partOfSpeech = 'Adjective';
                break;
              case 'Verb':
                this.word.partOfSpeech = 'Verb';
                break;

              default:
                this.word.partOfSpeech = 'Other';
            }
            this.manualForm.patchValue({
              original: this.word.original,
              partOfSpeech: this.word.partOfSpeech,
              translation: this.word.translation,
            });

            this.definitions.set(this.word.definitions);
            this.examples.set(this.word.examples);
          }
        })
      )
      .subscribe();
  }

  reset(e: Event) {
    e.preventDefault();
    this.toggleCase();
    this.manualForm.reset();
    this.addDefinition.reset();
    this.addExample.reset();
    this.definitions.set([]);
    this.examples.set([]);
  }

  toggleCase(): void {
    this.isCaseHidden = !this.isCaseHidden;
  }
  caseButtonHide(e: Event): void {
    e.preventDefault();
    if (this.manualForm.controls.partOfSpeech.value === 'Other') {
      this.isCaseButtonHidden = true;
      this.isCaseHidden = true;
    } else {
      this.isCaseButtonHidden = false;
    }
  }
}
