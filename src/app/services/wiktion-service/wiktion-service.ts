import { HttpClient } from '@angular/common/http';

import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  Observable,
  // ReplaySubject,
  Subject,
} from 'rxjs';
import { Word, WordWithId } from '../../utils/classes/word';

@Injectable({
  providedIn: 'root',
})
export class WiktionService {
  http = inject(HttpClient);

  public scrapeDelivery = new Subject<string>();
  // public scrapeInternal = new ReplaySubject<Word>(1);
  public scrapeInternal = new BehaviorSubject<Word>({
    definitions: [],
    examples: [],
    original: '',
    translation: '',
    partOfSpeech: '',
    case: {},
  });

  public newScrape$ = this.scrapeDelivery.asObservable();
  public newScrapeInternal$ = this.scrapeInternal.asObservable();

  public _definitionData = new Subject<string[]>();
  public readonly definitionData$: Observable<string[]> =
    this._definitionData.asObservable();
  updateDefinitionData(newData: string[]) {
    this._definitionData.next(newData);
  }

  public _exampleData = new Subject<string[]>();
  public readonly exampleData$: Observable<string[]> =
    this._exampleData.asObservable();
  updateExampleData(newData: string[]) {
    this._exampleData.next(newData);
  }

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
    return this.http.post<string>(url, submit).pipe(
      catchError(() => {
        window.alert('word not found');
        return EMPTY;
      })
    );
  };

  public saveNewWord(word: Word) {
    return this.http.post<Word>(
      `${environment.apiBaseUrl}/translate/save`,
      word
    );
  }
  public getOneWord(id: string) {
    return this.http.get<Word>(`${environment.apiBaseUrl}/translate/${id}`);
  }
  public patchNewWord(word: WordWithId) {
    const patchWord = new Word(
      word.original,
      word.translation,
      word.partOfSpeech
    );
    patchWord.case = word.case;
    patchWord.examples = word.examples;
    patchWord.definitions = word.definitions;
    return this.http.patch<Word>(
      `${environment.apiBaseUrl}/translate/${word.id}`,
      patchWord
    );
  }
}
