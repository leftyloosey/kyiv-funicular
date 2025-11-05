import { Injectable } from '@angular/core';
import { Observable, tap, catchError, EMPTY } from 'rxjs';
import { environment } from '../../environments/environments';
import { ScrapeOne } from '../../utils/interfaces/ScrapeOne';
import { HttpClient } from '@angular/common/http';
import { TranslateSubmit } from '../../utils/interfaces/TranslateSubmit';
export interface gReturn {
  word: string;
  translation: string;
  wordTranscription: string | null;
  translationTranscription: string | null;
  translations: object;
  definitions: object;
  examples: [];
}
@Injectable({
  providedIn: 'root',
})
export class GTranslateService {
  constructor(private http: HttpClient) {}
  public getOneGT = (submit: TranslateSubmit): Observable<gReturn> => {
    const url = `${environment.apiBaseUrl}/gtranslate/single`;

    return this.http.post<gReturn>(url, submit).pipe(
      catchError(() => {
        window.alert('word not found');
        return EMPTY;
      })
    );
  };
}
