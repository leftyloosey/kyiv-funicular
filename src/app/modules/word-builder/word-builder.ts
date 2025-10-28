import { Component, Inject, signal, ViewChild } from '@angular/core';
import { WordBuilderService } from '../../services/delivery-services/word-builder-service/word-builder-service';
import { map, merge, startWith, Subject, tap } from 'rxjs';
import { TopFormService } from '../../services/delivery-services/top-form-service/top-form-service';
import { Word, WordWithId } from '../../utils/classes/word';
import { TopForm } from '../../shared/components/top-form/top-form';
import { WiktionService } from '../../services/wiktion-service/wiktion-service';
import { DisplayBox } from '../../shared/components/display-box/display-box';
import { DisplayBoxService } from '../../services/delivery-services/display-box-service/display-box-service';
import { MatButton } from '@angular/material/button';
import { CaseComponent } from '../../shared/components/case-component/case-component';
import { CaseDelivery } from '../../services/delivery-services/case-delivery/case-delivery';
import { SHUT, SHUT2 } from '../../utils/tokens/closeable';
import { Closeable } from '../../utils/interfaces/Closeable';
import { TranslateService } from '../../services/translate-service/translate.service';
import { OffsetService } from '../../services/offset-service/offset-service';
import { LANGUAGE_TOKEN, lngToken } from '../../utils/tokens/language-token';
import { LanguageToken } from '../../services/language-token/language-token';
import { NameService } from '../../services/name-service/name-service';
import { Refreshable } from '../../utils/interfaces/Refreshable';
import { REFRESH } from '../../utils/tokens/refresh';
@Component({
  selector: 'app-word-builder',
  imports: [TopForm, DisplayBox, MatButton, CaseComponent],
  templateUrl: './word-builder.html',
  styleUrl: './word-builder.scss',
  providers: [
    {
      provide: REFRESH,
      useExisting: WordBuilder,
    },
  ],
})
export class WordBuilder implements Refreshable {
  @ViewChild(SHUT) cc?: Closeable;
  @ViewChild(SHUT2) cc2?: Closeable;
  protected refresh = signal<boolean>(false);
  public empty: Word = new Word('', '', '');

  constructor(
    @Inject(LANGUAGE_TOKEN) private languageToken$: Subject<lngToken>,
    protected builder: WordBuilderService,
    private topForm: TopFormService,
    private wiktion: WiktionService,
    private displayBox: DisplayBoxService,
    private caseDelivery: CaseDelivery,
    private translate: TranslateService,
    private offset: OffsetService,
    private token: LanguageToken,
    private name: NameService
  ) {
    builder.wordBuilderObserve$ = merge(
      caseDelivery.caseDeliveryObserve$,
      displayBox.definitionBoxObserve$,
      topForm.wordTopFormObserve$,
      wiktion.newScrapeInternal$,
      languageToken$.pipe(
        map((o) => {
          return { tag: o };
        })
      )
    ).pipe(
      startWith(this.empty),
      map((values) => {
        Object.assign(this.empty, values);
        this.empty.usersId = this.name.getUser();

        return this.empty;
      })
    );
  }

  protected saveWord(): void {
    const pretty = JSON.stringify(this.empty, null, 2);
    if (window.confirm(pretty)) {
      this.translate.upsertWord(this.empty).subscribe({
        next: (item: WordWithId) => {
          if (item)
            this.offset.offsetActions$.next({ word: item, action: 'update' });
        },
        error: (err) => window.alert(err),
        complete: () => {
          window.alert('Word saved.');
          this.refreshBuilder();
        },
      });
    } else {
      console.log('cancelled.');
    }
  }
  public refreshBuilder(): void {
    this.speechChanged();
    this.cc2?.shut();
    this.empty = new Word('', '', '');

    this.wiktion.pushInternalScrape(this.empty);
  }
  speechChanged(): void {
    this.cc?.shut();
  }
  sendUp(): void {
    this.refreshBuilder();
  }
}
