import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Word, WordWithId } from '../../../utils/classes/word';

@Injectable({
  providedIn: 'root',
})
export class WordBuilderService {
  public empty: Word = new Word('', '', '');

  public _wordBuilder = new BehaviorSubject<Word>(this.empty);
  public wordBuilderObserve$: Observable<Word> =
    this._wordBuilder.asObservable();

  public updateWordBuilder(newData: Word) {
    this._wordBuilder.next(newData);
  }
}
