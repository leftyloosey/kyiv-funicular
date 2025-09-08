import { HttpClient } from '@angular/common/http';

import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { translatable } from '../../modules/translate/translatable';
import { ReplaySubject, Subject } from 'rxjs';
import { Word, WordInterface } from '../../utils/classes/word';

@Injectable({
  providedIn: 'root',
})
export class WiktionService {
  http = inject(HttpClient);

  public scrapeDelivery = new Subject<string>();
  public scrapeInternal = new ReplaySubject<Word>();
  // public scrapeInternal = new ReplaySubject<string>();

  public newScrape$ = this.scrapeDelivery.asObservable();
  public newScrapeInternal$ = this.scrapeInternal.asObservable();

  public pushScrape(word: string) {
    this.scrapeDelivery.next(word);
  }
  public pushInternalScrape(word: Word) {
    this.scrapeInternal.next(word);
  }
  public scrapeOne = (word: string) => {
    const url = `${environment.apiBaseUrl}/translate/scrape`;
    const submit = { text: word };
    console.log(submit);
    return this.http.post<string>(url, submit);
  };

  public saveNewWord(word: Word) {
    return this.http.post<Word>(
      `${environment.apiBaseUrl}/translate/save`,
      word
    );
  }
}
