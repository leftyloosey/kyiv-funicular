import { Component, inject, ViewChild } from '@angular/core';
import { map, tap } from 'rxjs';
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
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ExampleEdit } from '../../../shared/components/example-edit/example-edit';
import { DefinitionEdit } from '../../../shared/components/definition-edit/definition-edit';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { switchPartSpeech } from '../../../utils/functions/functions';
import { DragDrop } from '../../../shared/components/drag-drop/drag-drop';

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
    DragDrop,
  ],
  templateUrl: './newword.html',
  styleUrl: './newword.scss',
})
export class Newword {
  isCaseHidden: boolean = true;

  word: Word = {
    definitions: [],
    examples: [],
    original: '',
    translation: '',
    partOfSpeech: '',
    case: {},
  };
  wiktion = inject(WiktionService);

  @ViewChild(ExampleEdit) exampleChild!: ExampleEdit;
  @ViewChild(DefinitionEdit) definitionChild!: DefinitionEdit;

  protected manualForm = new FormGroup({
    original: new FormControl(''),
    translation: new FormControl(''),
    partOfSpeech: new FormControl(''),
  });

  defs = toSignal(
    this.wiktion.definitionData$.pipe(
      // takeUntilDestroyed(),
      tap((defs) => {
        this.word.definitions = defs;
      })
    )
  );

  exmps = toSignal(
    this.wiktion.exampleData$.pipe(
      // takeUntilDestroyed(),
      tap((exmps) => {
        this.word.examples = exmps;
      })
    )
  );

  def: string = 'def';
  exmp: string = 'exmp';

  formValues$ = this.manualForm.valueChanges;

  constructor() {
    this.wiktion.newScrapeInternal$
      .pipe(
        takeUntilDestroyed(),
        map((translatedWord) => {
          if (translatedWord) {
            this.word = translatedWord;
            this.word.case = {};
            this.word.partOfSpeech = switchPartSpeech(translatedWord);

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

    this.formValues$
      .pipe(
        takeUntilDestroyed(),
        map((words) => {
          this.word.original = words.original as string;
          this.word.translation = words.translation as string;
          this.word.partOfSpeech = words.partOfSpeech as string;
        })
      )
      .subscribe();
  }

  seeWord(e: Event) {
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

  onSendUp($event: WordCase) {
    this.word.case = $event;
  }

  reset(e: Event) {
    e.preventDefault();
    this.word = new Word('', '', '');
    this.wiktion.pushInternalScrape(this.word);
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
