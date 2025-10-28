import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { wordDefinitions } from '../../../utils/interfaces/WordDefinitions';
@Injectable({
  providedIn: 'root',
})
export class DisplayBoxService {
  public _definitionBox = new Subject<wordDefinitions>();
  public definitionBoxObserve$: Observable<wordDefinitions> =
    this._definitionBox.asObservable();
  public updateDefinitionBox(newData: wordDefinitions) {
    this._definitionBox.next(newData);
  }
}
