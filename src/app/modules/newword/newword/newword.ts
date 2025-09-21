import { Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { map, Subscription, tap } from 'rxjs';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';
import { Word, WordCase } from '../../../utils/classes/word';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Wiktion } from '../../wiktion/wiktion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';
import { EditAdjective } from '../../../shared/components/edit-adjective/edit-adjective';
import { EditNoun } from '../../../shared/components/edit-noun/edit-noun';
import { EditImperfect } from '../../../shared/components/edit-imperfect/edit-imperfect';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ExampleEdit } from '../../../shared/components/example-edit/example-edit';
import { DefinitionEdit } from '../../../shared/components/definition-edit/definition-edit';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
@Component({
  selector: 'app-newword',
  imports: [
    ReactiveFormsModule,
    Wiktion,
    MatFormFieldModule,
    ExampleEdit,
    DefinitionEdit,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogContent,
    EditAdjective,
    EditNoun,
    EditImperfect,
    AsyncPipe,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
  ],
  templateUrl: './newword.html',
  styleUrl: './newword.scss',
})
export class Newword implements OnDestroy, AfterViewInit {
  isCaseHidden: boolean = true;

  word: Word = {
    definitions: [],
    examples: [],
    original: '',
    translation: '',
    partOfSpeech: '',
    case: {},
  };
  translationSub!: Subscription;

  @ViewChild(ExampleEdit) exampleChild!: ExampleEdit;
  @ViewChild(DefinitionEdit) definitionChild!: DefinitionEdit;

  protected manualForm = new FormGroup({
    original: new FormControl(''),
    translation: new FormControl(''),
    partOfSpeech: new FormControl(''),
  });

  submitManualWord() {
    this.word.original = this.manualForm.value.original as string;
    this.word.translation = this.manualForm.value.translation as string;
    this.word.partOfSpeech = this.manualForm.value.partOfSpeech as string;
  }
  onSendUp($event: WordCase) {
    this.word.case = $event;
  }

  seeWord(e: Event) {
    this.word.original = this.manualForm.value.original as string;
    this.word.translation = this.manualForm.value.translation as string;
    this.word.partOfSpeech = this.manualForm.value.partOfSpeech as string;

    if (window.confirm(JSON.stringify(this.word))) {
      this.wiktion.saveNewWord(this.word).subscribe({
        error: (err) => window.alert(err),
        complete: () => {
          window.alert('successful');
        },
      });

      this.reset(e);
    } else {
      console.log('cancelled.');
    }
  }

  constructor(protected wiktion: WiktionService) {
    this.wiktion.definitionData$
      .pipe(
        takeUntilDestroyed(),
        tap((defs) => {
          console.log(defs);
          this.word.definitions = defs;
        })
      )
      .subscribe();

    this.wiktion.exampleData$
      .pipe(
        takeUntilDestroyed(),
        tap((exmps) => {
          console.log('exmps', exmps);

          this.word.examples = exmps;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.translationSub = this.wiktion.newScrapeInternal$
      .pipe(
        map((translatedWord) => {
          if (translatedWord) {
            this.word = translatedWord;
            this.word.case = {};
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

            this.wiktion.updateDefinitionData(this.word.definitions);
            this.wiktion.updateExampleData(this.word.examples);
          }
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.translationSub.unsubscribe();
  }

  reset(e: Event) {
    e.preventDefault();
    this.word = {
      definitions: [],
      examples: [],
      original: '',
      translation: '',
      partOfSpeech: '',
      case: {},
    };
    this.isCaseHidden = true;
    this.manualForm.reset();
    this.wiktion.updateDefinitionData([]);
    this.wiktion.updateExampleData([]);
    this.exampleChild.reset();
    this.definitionChild.reset();
  }

  toggleCase(): void {
    this.isCaseHidden = !this.isCaseHidden;
  }
}
