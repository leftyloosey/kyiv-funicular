import { Component, inject } from '@angular/core';
import { map, merge, tap } from 'rxjs';
import { WiktionService } from '../../services/wiktion-service/wiktion-service';
import { Word, WordWithId } from '../../utils/classes/word';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { OffsetQuizFifty } from '../offset-quiz-fifty/offset-quiz-fifty';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WordBuilderService } from '../../services/word-builder-service/word-builder-service';
import { TopFormService } from '../../services/top-form-service/top-form-service';
import { DisplayBoxService } from '../../services/display-box-service/display-box-service';
import { DisplayBox } from '../../shared/components/display-box/display-box';
import { CaseComponent } from '../../shared/components/case-component/case-component';
// import { TopForm } from '../top-form/top-form';
import { TopForm } from '../../shared/components/top-form/top-form';
import { MatButton } from '@angular/material/button';
import { CaseDelivery } from '../../services/case-delivery/case-delivery';
import { TranslateService } from '../../services/translate-service/translate.service';
@Component({
  selector: 'app-edit-word',
  imports: [DisplayBox, MatDialogContent, CaseComponent, MatButton, TopForm],
  templateUrl: './edit-word.html',
  styleUrl: './edit-word.scss',
})
export class EditWord {
  public empty: WordWithId = new WordWithId('', '', '');

  data = inject(MAT_DIALOG_DATA, { optional: true });

  isCaseHidden: boolean = true;
  isCaseButtonHidden: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<OffsetQuizFifty>,
    private builder: WordBuilderService,
    private topForm: TopFormService,
    private wiktion: WiktionService,
    private displayBox: DisplayBoxService,
    private caseDelivery: CaseDelivery,
    private translate: TranslateService
  ) {
    this.translate
      .getOneWord(this.data.word.id)
      .pipe(
        takeUntilDestroyed(),
        tap((word) => {
          this.wiktion.pushInternalScrape(word);
        })
      )
      .subscribe();

    builder.wordBuilderObserve$ = merge(
      caseDelivery.caseDeliveryObserve$,
      displayBox.definitionBoxObserve$,
      topForm.wordTopFormObserve$,
      wiktion.newScrapeInternal$
    ).pipe(
      takeUntilDestroyed(),
      map((values) => {
        Object.assign(this.empty, values);
        return this.empty;
      })
    );
  }

  patchWord() {
    const pretty = JSON.stringify(this.empty, null, 2);

    if (window.confirm(pretty)) {
      this.translate.patchNewWord(this.empty).subscribe({
        next: (item) => {
          this.closeAndSave(item);
        },
        error: (err) => window.alert(JSON.stringify(err)),
        complete: () => window.alert('successful'),
      });
    } else {
      console.log('cancelled.');
    }
  }

  saveWord() {
    this.patchWord();
  }

  closeAndSave(savedWord: Word) {
    this.dialogRef.close(savedWord);
  }
}
