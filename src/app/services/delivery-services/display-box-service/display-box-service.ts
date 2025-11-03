import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NewTranslate } from '../../../utils/interfaces/NewTranslate';
import { wordDefinitions } from '../../../utils/interfaces/WordDefinitions';
import { TranslateDialogData } from '../../../utils/interfaces/TranslateDialogData';
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
  // public _newTranslate = new Subject<NewTranslate>();
  // public newTranslateObserve$: Observable<NewTranslate> =
  //   this._newTranslate.asObservable();
  // public updateNewTranslate(newData: NewTranslate) {
  //   this._newTranslate.next(newData);
  // }
  public _definitionString = new Subject<TranslateDialogData>();
  public definitionStringObserve$: Observable<TranslateDialogData> =
    this._definitionString.asObservable();
  public updateDefinitionString(newData: TranslateDialogData) {
    this._definitionString.next(newData);
  }
}
