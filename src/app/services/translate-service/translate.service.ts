import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { translatable } from '../../modules/translate/translatable';
import { catchError, EMPTY, Subject } from 'rxjs';
import { FirstFifty, Word, WordWithId } from '../../utils/classes/word';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  public empty: WordWithId = {
    id: '',
    definitions: ['stray horse'],
    examples: ['voon'],
    case: {},
    original: 'yaro_friendo',
    translation: 'eeps',
    partOfSpeech: 'ganological',
  };
  public wordDelivery$ = new Subject<string>();

  http = inject(HttpClient);

  public getAllWords = () => {
    const url = `${environment.apiBaseUrl}/translate`;
    return this.http.get<Word[]>(url);
  };
  public getFiftyWords = () => {
    const url = `${environment.apiBaseUrl}/translate/firstfifty`;
    return this.http.get<FirstFifty>(url);
  };
  public getNextFiftyWords = (original: string) => {
    const submit = { original: original };
    if (!original) {
      const url = `${environment.apiBaseUrl}/translate/firstfifty`;
      return this.http.get<FirstFifty>(url);
    } else {
      const url = `${environment.apiBaseUrl}/translate/nextfifty`;
      return this.http.post<FirstFifty>(url, submit);
    }
  };

  public getNextFiftyWordsOffset = (page: number) => {
    const submit = { page: page };
    const url = `${environment.apiBaseUrl}/translate/nextoffset`;
    return this.http.post<FirstFifty>(url, submit);
  };

  public translateOne = (word: string) => {
    console.log(word);
    const url = `${environment.apiBaseUrl}/translate`;
    const submit = { text: word };
    console.log(submit);
    return this.http.post<translatable>(url, submit);
  };
}
