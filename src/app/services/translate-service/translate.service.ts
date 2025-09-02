import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { translatable } from '../../modules/translate/translatable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  public wordDelivery$ = new Subject<string>();
  // public scrapeDelivery$ = new Subject<string>();

  // public newScrape = this.scrapeDelivery$.asObservable();

  // public pushScrape(word: string) {
  //   this.scrapeDelivery$.next(word);
  // }

  http = inject(HttpClient);

  public getAllWords = () => {
    const url = `${environment.apiBaseUrl}/translate`;
    return this.http.get<translatable[]>(url);
  };

  public translateOne = (word: string) => {
    console.log(word);
    const url = `${environment.apiBaseUrl}/translate`;
    const submit = { text: word };
    console.log(submit);
    return this.http.post<translatable>(url, submit);
  };
  // public scrapeOne = (word: string) => {
  //   const url = `${environment.apiBaseUrl}/translate/scrape`;
  //   const submit = { text: word };
  //   console.log(submit);
  //   return this.http.post<string>(url, submit);
  // };
}
