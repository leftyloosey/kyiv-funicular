import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { AheadService } from '../../../services/delivery-services/ahead-service/ahead-service';
import { WordWithId } from '../../../utils/classes/word';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '../../../services/translate-service/translate.service';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Ahead } from '../../../utils/interfaces/AheadType';

import { WiktionService } from '../../../services/wiktion-service/wiktion-service';

@Component({
  selector: 'app-search-ahead',
  imports: [AsyncPipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search-ahead.html',
  styleUrl: './search-ahead.scss',
})
export class SearchAhead implements OnInit {
  protected clearCaseForLoadWord = output<null>();
  downPut = input<
    Observable<
      Partial<{
        original: string | null;
        // translation: string | null;
        // partOfSpeech: string | null;
      }>
    >
  >();
  protected initAhead: Ahead = { ahead: '' };

  public output$: Observable<WordWithId[]>;
  private destroyRef = inject(DestroyRef);

  protected aheadForm = new FormGroup({
    ahead: new FormControl('', { nonNullable: true }),
  });
  protected formValues$ = this.aheadForm.valueChanges;

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog,
    protected aheadService: AheadService,
    private wiktion: WiktionService
  ) {
    this.output$ = this.aheadService.ahead$.pipe(
      debounceTime(750),
      switchMap((ahead) => {
        const sub = ahead.ahead;
        return this.translate.getAheadWord(sub);
      })
    );
  }
  ngOnInit(): void {
    this.downPut()
      ?.pipe(
        tap((word) => {
          const { original } = word;
          if (original) {
            const sub = { ahead: original };
            this.aheadService.updateAheadWord(sub);
          }
        })
      )
      .subscribe();
  }
  protected loadWordFromList(id: string): void {
    const temp = new WordWithId('', '', '');
    temp.id = id;
    this.translate
      .getOneWord(id)
      .pipe(
        tap((re) => {
          this.clearCaseForLoadWord.emit(null);
          this.wiktion.pushInternalScrape(re);
        })
      )
      .subscribe();
  }
}
