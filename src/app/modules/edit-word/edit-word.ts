import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
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
import { Router } from '@angular/router';
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
    // DynamicFormComponent,
    ExampleEdit,
    DefinitionEdit,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
  ],
  templateUrl: './edit-word.html',
  styleUrl: './edit-word.scss',
})
export class EditWord implements OnDestroy, AfterViewInit {
  isCaseHidden: boolean = true;
  isCaseButtonHidden: boolean = false;
  router = inject(Router);
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
  bob!: Subscription;
  data = inject(MAT_DIALOG_DATA, { optional: true });

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

  sendUpDef($event: string[]) {
    const newDefArray: string[] = [];

    interface newDefInterface {
      definition: string;
    }

    for (const def of $event) {
      const { definition } = def as unknown as newDefInterface;
      newDefArray.push(definition);
    }
    this.word.definitions = newDefArray;

    this.definitions.set(newDefArray);
  }
  sendUpExmp($event: string[]) {
    const newExmpArray: string[] = [];

    interface newExmpInterface {
      example: string;
    }

    for (const exmp of $event) {
      const { example } = exmp as unknown as newExmpInterface;
      newExmpArray.push(example);
    }
    this.word.examples = newExmpArray;
    this.examples.set(newExmpArray);
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

  patchWord(e: Event) {
    this.word.original = this.manualForm.value.original as string;
    this.word.translation = this.manualForm.value.translation as string;
    this.word.partOfSpeech = this.manualForm.value.partOfSpeech as string;

    if (window.confirm(JSON.stringify(this.word))) {
      this.wiktion.patchNewWord(this.word as WordWithId).subscribe({
        next: (item) => {
          console.log(item);
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
  constructor(
    private wiktion: WiktionService,
    public dialogRef: MatDialogRef<Quiz>
  ) {}

  saveData(resultData: Word) {
    this.dialogRef.close(resultData);
  }
  ngAfterViewInit(): void {
    // ngOnInit(): void {
    this.bob = this.wiktion
      .getOneWord(this.data.word.id)
      .pipe(
        // taskeUntilDestroyed(),
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
      .subscribe({
        error: (err) => window.alert(err),
      });
  }

  ngOnDestroy(): void {
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
    this.addDefinition.reset();
    this.addExample.reset();
    this.definitions.set([]);
    this.examples.set([]);
    this.wiktion.pushInternalScrape({
      definitions: [],
      examples: [],
      original: '',
      translation: '',
      partOfSpeech: '',
      case: {},
    });
    this.bob.unsubscribe();
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
