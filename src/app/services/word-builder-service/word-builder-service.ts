import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WordWithId } from '../../utils/classes/word';

@Injectable({
  providedIn: 'root',
})
export class WordBuilderService {
  public _wordBuilder = new Subject<WordWithId>();
  public wordBuilderObserve$: Observable<WordWithId> =
    this._wordBuilder.asObservable();

  public updateWordBuilder(newData: WordWithId) {
    this._wordBuilder.next(newData);
  }
}
