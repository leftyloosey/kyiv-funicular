import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Word, WordWithId } from '../../utils/classes/word';
import { FirstFifty } from '../../utils/interfaces/FirstFifty';
import { SkipLoading } from '../../utils/interceptors/basic.interceptor';
import { lngToken } from '../../utils/tokens/language-token';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  public empty = new WordWithId('', '', '');

  constructor(private http: HttpClient) {}

  public getOneWord(id: string): Observable<Word> {
    return this.http.get<Word>(`${environment.apiBaseUrl}/translate/${id}`);
  }

  public getAheadWord = (ahead: string): Observable<WordWithId[]> => {
    const submit = { ahead: ahead };
    const url = `${environment.apiBaseUrl}/translate/ahead`;
    return this.http
      .post<WordWithId[]>(url, submit, {
        context: new HttpContext().set(SkipLoading, true),
      })
      .pipe(
        catchError(() => {
          return EMPTY;
        })
      );
  };

  public getAllWords = (): Observable<Word[]> => {
    const url = `${environment.apiBaseUrl}/translate`;
    return this.http.get<Word[]>(url);
  };

  public getNextFiftyWordsOffset = (
    page: number,
    tag: lngToken
  ): Observable<FirstFifty> => {
    const submit = { page: page, tag: tag };
    const url = `${environment.apiBaseUrl}/translate/nextoffset`;
    return this.http.post<FirstFifty>(url, submit);
  };

  public saveNewWord(word: Word): Observable<Word> {
    return this.http.post<Word>(
      `${environment.apiBaseUrl}/translate/save`,
      word
    );
  }

  public patchNewWord(word: WordWithId): Observable<Word> {
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

  public upsertWord(word: Word): Observable<WordWithId> {
    return this.http.post<WordWithId>(
      `${environment.apiBaseUrl}/translate/upsert`,
      word
    );
  }
  public deleteWord(id: string): Observable<WordWithId> {
    return this.http.delete<WordWithId>(
      `${environment.apiBaseUrl}/translate/${id}`
    );
  }
}
