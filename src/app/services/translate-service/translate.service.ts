import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { translatable } from '../../modules/translate/translatable';
import { Subject } from 'rxjs';
import { Word } from '../../utils/classes/word';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  public wordDelivery$ = new Subject<string>();

  http = inject(HttpClient);

  public getAllWords = () => {
    const url = `${environment.apiBaseUrl}/translate`;
    return this.http.get<Word[]>(url);
  };

  public translateOne = (word: string) => {
    console.log(word);
    const url = `${environment.apiBaseUrl}/translate`;
    const submit = { text: word };
    console.log(submit);
    return this.http.post<translatable>(url, submit);
  };
}
