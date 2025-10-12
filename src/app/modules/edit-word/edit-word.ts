import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { map, tap } from 'rxjs';
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
import { OffsetQuizFifty } from '../offset-quiz-fifty/offset-quiz-fifty';
import { ExampleEdit } from '../../shared/components/example-edit/example-edit';
import { DefinitionEdit } from '../../shared/components/definition-edit/definition-edit';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelTitle,
  MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DragDrop } from '../../shared/components/drag-drop/drag-drop';
import { switchPartSpeech } from '../../utils/functions/functions';
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
    DragDrop,
  ],
  templateUrl: './edit-word.html',
  styleUrl: './edit-word.scss',
})
export class EditWord implements AfterViewInit {
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
  data = inject(MAT_DIALOG_DATA, { optional: true });

  protected manualForm = new FormGroup({
    original: new FormControl(''),
    translation: new FormControl(''),
    partOfSpeech: new FormControl(''),
  });

  formValues$ = this.manualForm.valueChanges;

  wiktion = inject(WiktionService);

  defs = toSignal(
    this.wiktion.definitionData$.pipe(
      takeUntilDestroyed(),
      tap((defs) => {
        this.word.definitions = defs;
      })
    )
  );

  exmps = toSignal(
    this.wiktion.exampleData$.pipe(
      takeUntilDestroyed(),
      tap((exmps) => {
        this.word.examples = exmps;
      })
    )
  );

  def: string = 'def';
  exmp: string = 'exmp';

  constructor(
    public dialogRef: MatDialogRef<OffsetQuizFifty>,
    private destroyRef: DestroyRef
  ) {
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.wiktion
        .getOneWord(this.data.word.id)
        .pipe(
          tap((translatedWord) => {
            if (translatedWord) {
              this.word = translatedWord;
              this.word.partOfSpeech = switchPartSpeech(translatedWord);

              this.manualForm.patchValue({
                original: this.word.original,
                partOfSpeech: this.word.partOfSpeech,
                translation: this.word.translation,
              });

              this.wiktion.updateDefinitionData(this.word.definitions);
              this.wiktion.updateExampleData(this.word.examples);
            }
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
          error: (err) => window.alert(err),
        });
    }, 0);
  }

  patchWord(e: Event) {
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

  onSendUp($event: WordCase) {
    this.word.case = $event;
  }
  saveData(resultData: Word) {
    console.log(resultData);
    this.dialogRef.close(resultData);
  }

  public reset(e: Event) {
    e.preventDefault();
    this.word = new Word('', '', '');
    this.isCaseHidden = true;
    this.manualForm.reset();
  }

  toggleCase(): void {
    this.isCaseHidden = !this.isCaseHidden;
  }
}
