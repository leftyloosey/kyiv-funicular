import { Component, Inject, signal, ViewChild } from '@angular/core';
import { WordBuilderService } from '../../services/word-builder-service/word-builder-service';
import { map, merge, mergeMap, startWith, Subject, switchMap, tap } from 'rxjs';
import { TopFormService } from '../../services/delivery-services/top-form-service/top-form-service';
import { Word } from '../../utils/classes/word';
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
  protected deleteButtonVisible: boolean = false;
  protected refresh = signal<boolean>(false);
  protected formInvalid: boolean = true;
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
    private name: NameService
  ) {
    builder.wordBuilderObserve$ = merge(
      caseDelivery.caseDeliveryObserve$,
      displayBox.definitionBoxObserve$,
      displayBox.definitionBoxObserve$.pipe(
        mergeMap((wd) =>
          displayBox.definitionStringObserve$.pipe(
            map((ds) => {
              const combined = this.builder.defCombiner(ds.type, wd, ds);

              return combined;
            })
          )
        )
      ),
      topForm.wordTopFormObserve$,
      wiktion.newScrapeInternal$,
      languageToken$.pipe(
        map((tag) => {
          return { tag };
        })
      )
    ).pipe(
      startWith(this.empty),
      map((values) => {
        Object.assign(this.empty, values);
        if (this.empty.id) this.deleteButtonVisible = true;
        if (!this.empty.id) this.deleteButtonVisible = false;
        this.empty.usersId = this.name.getUser();
        return this.empty;
      })
    );
  }

  protected saveWord(): void {
    const refresh = this.builder
      .saveWord(this.empty)
      .then((w) => {
        if (w.id) this.refreshBuilder();
      })
      .catch(() => window.alert('Error saving word.'));
  }

  protected deleteWord(): void {
    const refresh = this.builder
      .deleteWord(this.empty)
      .then((w) => {
        if (w.id) this.refreshBuilder();
      })
      .catch(() => window.alert('Error deleting word.'));
  }

  public refreshBuilder(): void {
    this.partOfSpeechChanged();
    this.cc2?.shut();
    this.empty = new Word('', '', '');
    this.wiktion.pushInternalScrape(this.empty);
  }

  public partOfSpeechChanged(): void {
    this.cc?.shut();
  }
  protected formStatusChanged(status: boolean): void {
    this.formInvalid = status;
  }
  protected sendUp(): void {
    this.refreshBuilder();
  }
}
