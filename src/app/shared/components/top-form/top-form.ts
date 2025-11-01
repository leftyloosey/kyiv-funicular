import { Component, output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormControlStatus,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TopFormService } from '../../../services/delivery-services/top-form-service/top-form-service';
import { Observable, startWith, tap } from 'rxjs';
import { topValues } from '../../../utils/interfaces/TopValues';
import { WordBuilderService } from '../../../services/word-builder-service/word-builder-service';
import { Word } from '../../../utils/classes/word';
import { AsyncPipe } from '@angular/common';
import { SearchAhead } from '../search-ahead/search-ahead';
import { Wiktion } from '../wiktion/wiktion';

@Component({
  selector: 'app-top-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    SearchAhead,
    AsyncPipe,
    Wiktion,
  ],
  templateUrl: './top-form.html',
  styleUrl: './top-form.scss',
})
export class TopForm {
  protected speechChange = output<null>();
  protected statusChange = output<boolean>();
  private valuesToSend: topValues = {
    original: '',
    translation: '',
    partOfSpeech: '',
  };

  protected manualForm = new FormGroup({
    original: new FormControl('', Validators.required),
    translation: new FormControl('', Validators.required),
    partOfSpeech: new FormControl('', Validators.required),
  });

  get original() {
    return this.manualForm.get('original');
  }
  get translation() {
    return this.manualForm.get('translation');
  }
  get partOfSpeech() {
    return this.manualForm.get('partOfSpeech');
  }

  protected input$: Observable<Word>;
  protected vals$: Observable<Partial<topValues>>;
  protected changes$: Observable<Partial<FormControlStatus>>;

  protected formValues$ = this.manualForm.valueChanges;
  protected formChanges$ = this.manualForm.statusChanges;

  constructor(
    private topForm: TopFormService,
    private builder: WordBuilderService
  ) {
    this.input$ = builder.wordBuilderObserve$.pipe(
      tap((items) => {
        const switched = topForm.switchPartSpeech(items.partOfSpeech);
        this.manualForm.patchValue({
          original: items.original,
          partOfSpeech: switched,
          translation: items.translation,
        });
      })
    );

    this.vals$ = this.formValues$.pipe(
      startWith(this.valuesToSend),
      tap((values) => {
        const { original, translation, partOfSpeech } = values;
        this.valuesToSend = {
          original: original as string,
          translation: translation as string,
          partOfSpeech: partOfSpeech as string,
        };
      })
    );
    this.changes$ = this.formChanges$.pipe(
      tap((changes) => {
        if (changes === 'VALID') this.statusChange.emit(false);
        if (changes === 'INVALID') this.statusChange.emit(true);
      })
    );
  }

  protected submitToBuilder(): void {
    this.topForm.updateTopForm(this.valuesToSend);
  }
  protected speechChanged(): void {
    this.speechChange.emit(null);
  }
}
