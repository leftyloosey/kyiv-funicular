import { Injectable, signal } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { lngToken } from '../../utils/tokens/language-token';

@Injectable({
  providedIn: 'root',
})
export class LanguageToken {
  // public langToken = signal<langToken>({ lang: 'uk' });
  // public langToken: langToken = { lang: 'uk' };
  // public getToken(): langToken {
  //   return this.langToken();
  // }
  // public setLangToken(newToken: langToken): void {
  //   this.langToken.set(newToken);
  //   // this.langToken = newToken;
  // }
  // public _langToken = new BehaviorSubject<langToken>({ lang: 'uk' });
  // public _langToken = new Subject<langToken>();
  // public lang$: Observable<langToken> = this._langToken.asObservable();
  // updateLangToken(newData: langToken) {
  //   this._langToken.next(newData);
  // }
}
