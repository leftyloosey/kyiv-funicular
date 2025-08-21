import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import {
  CreateTranslateDto,
  translatable,
} from '../../modules/translate/translatable';
// type CreateTranslateDto = {
//   text: string;
// };

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
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
}
