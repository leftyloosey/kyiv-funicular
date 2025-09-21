import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { WiktionService } from '../../services/wiktion-service/wiktion-service';
import { Word, WordCase, WordWithId } from '../../utils/classes/word';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EditNoun } from '../../shared/components/edit-noun/edit-noun';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { EditImperfect } from '../../shared/components/edit-imperfect/edit-imperfect';
import { EditAdjective } from '../../shared/components/edit-adjective/edit-adjective';
import { Quiz } from '../quiz/quiz';
import { ExampleEdit } from '../../shared/components/example-edit/example-edit';
import { DefinitionEdit } from '../../shared/components/definition-edit/definition-edit';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelTitle,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit-word',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogContent,
    EditNoun,
    EditImperfect,
    EditAdjective,
    ExampleEdit,
    DefinitionEdit,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    AsyncPipe,
  ],
  templateUrl: './edit-word.html',
  styleUrl: './edit-word.scss',
})
export class EditWord implements OnDestroy, AfterViewInit {
  isCaseHidden: boolean = true;
  isCaseButtonHidden: boolean = false;
  word: Word = {
    definitions: [],
    examples: [],
    original: '',
    translation: '',
    partOfSpeech: '',
    case: {},
  };
  translateSub!: Subscription;
  data = inject(MAT_DIALOG_DATA, { optional: true });

  protected manualForm = new FormGroup({
    original: new FormControl(''),
    translation: new FormControl(''),
    partOfSpeech: new FormControl(''),
  });

  constructor(
    protected wiktion: WiktionService,
    public dialogRef: MatDialogRef<Quiz>
  ) {
    this.wiktion.definitionData$
      .pipe(
        takeUntilDestroyed(),
        tap((defs) => {
          this.word.definitions = defs;
        })
      )
      .subscribe();

    this.wiktion.exampleData$
      .pipe(
        takeUntilDestroyed(),
        tap((exmps) => {
          this.word.examples = exmps;
        })
      )
      .subscribe();
  }
  ngAfterViewInit(): void {
    this.translateSub = this.wiktion
      .getOneWord(this.data.word.id)
      .pipe(
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

            this.wiktion.updateDefinitionData(this.word.definitions);
            this.wiktion.updateExampleData(this.word.examples);
          }
        })
      )
      .subscribe({
        error: (err) => window.alert(err),
      });
  }
  onSendUp($event: WordCase) {
    this.word.case = $event;
  }
  saveData(resultData: Word) {
    this.dialogRef.close(resultData);
  }
  patchWord(e: Event) {
    this.word.original = this.manualForm.value.original as string;
    this.word.translation = this.manualForm.value.translation as string;
    this.word.partOfSpeech = this.manualForm.value.partOfSpeech as string;

    if (window.confirm(JSON.stringify(this.word))) {
      this.wiktion.patchNewWord(this.word as WordWithId).subscribe({
        next: (item) => {
          this.saveData(item);
        },
        error: (err) => window.alert(JSON.stringify(err)),
        complete: () => window.alert('successful'),
      });

      this.reset(e);
    } else {
      console.log('cancelled.');
    }
  }

  ngOnDestroy(): void {
    this.translateSub.unsubscribe();
  }

  public reset(e: Event) {
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
  }

  toggleCase(): void {
    this.isCaseHidden = !this.isCaseHidden;
  }
}
