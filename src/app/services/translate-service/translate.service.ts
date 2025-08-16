import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

type CreateTranslateDto = {
  text: string;
};

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  http = inject(HttpClient);

  public translateOne = (word: string) => {
    const url = `${environment.apiBaseUrl}/translate`;
    const submit = { text: word };

    return this.http
      .post<CreateTranslateDto>(url, submit)
      .subscribe((data) => console.log(data))
      .unsubscribe();
  };
}
