import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { catchError, EMPTY, ReplaySubject, Subject } from 'rxjs';
import { Word } from '../../utils/classes/word';
import { ScrapeOne } from '../../utils/interfaces/ScrapeOne';
import { LangTargetService } from '../lang-target-service/lang-target-service';

@Injectable({
  providedIn: 'root',
})
export class WiktionService {
  // http = inject(HttpClient);
  constructor(private http: HttpClient, private target: LangTargetService) {}
  public scrapeDelivery = new Subject<ScrapeOne>();
  // public scrapeDelivery = new Subject<string>();
  public scrapeInternal = new ReplaySubject<Word>(1);

  public newScrape$ = this.scrapeDelivery.asObservable();
  public newScrapeInternal$ = this.scrapeInternal.asObservable();

  public pushScrape(scrape: ScrapeOne) {
    this.scrapeDelivery.next(scrape);
  }
  // public pushScrape(word: string) {
  //   this.scrapeDelivery.next(word);
  // }
  public pushInternalScrape(word: Word) {
    this.scrapeInternal.next(word);
  }
  public scrapeOne = (scrape: ScrapeOne) => {
    console.log('target before scrape', this.target.target());
    const url = `${environment.apiBaseUrl}/translate/scrape`;
    const submit = { text: scrape.word, tag: scrape.tag };
    console.log(submit);
    return this.http.post<string>(url, submit).pipe(
      catchError(() => {
        window.alert('word not found');
        return EMPTY;
      })
    );
  };
}
