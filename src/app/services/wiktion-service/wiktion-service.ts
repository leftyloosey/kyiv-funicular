import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { catchError, EMPTY, ReplaySubject, Subject, tap } from 'rxjs';
import { Word } from '../../utils/classes/word';
import { ScrapeOne } from '../../utils/interfaces/ScrapeOne';
import { LangTargetService } from '../lang-target-service/lang-target-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LANGUAGE_TOKEN, lngToken } from '../../utils/tokens/language-token';

@Injectable({
  providedIn: 'root',
})
export class WiktionService {
  private lngToken: lngToken = 'uk';
  constructor(
    @Inject(LANGUAGE_TOKEN) private languageToken: Subject<lngToken>,
    private http: HttpClient,
    private target: LangTargetService
  ) {
    languageToken
      .pipe(
        takeUntilDestroyed(),
        tap((value) => {
          this.lngToken = value;
        })
      )
      .subscribe();
  }
  public scrapeDelivery = new Subject<ScrapeOne>();
  public scrapeInternal = new ReplaySubject<Word>(1);

  public newScrape$ = this.scrapeDelivery.asObservable();
  public newScrapeInternal$ = this.scrapeInternal.asObservable();

  public pushScrape(scrape: ScrapeOne) {
    this.scrapeDelivery.next(scrape);
  }

  public pushInternalScrape(word: Word) {
    this.scrapeInternal.next(word);
  }
  public scrapeOne = (scrape: ScrapeOne) => {
    const url = `${environment.apiBaseUrl}/translate/scrape`;
    const submit = {
      text: scrape.word,
      tag: this.lngToken,
      target: this.target.target(),
    };
    return this.http.post<string>(url, submit).pipe(
      catchError(() => {
        window.alert('word not found');
        return EMPTY;
      })
    );
  };

  public loopDefsToWord(definitions: string[]): string[] {
    let returnDefs: string[] = [];
    for (let index = 1; index < definitions.length; index++) {
      returnDefs.push(definitions[index]);
    }
    return returnDefs;
  }
}
