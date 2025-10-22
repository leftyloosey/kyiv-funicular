import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Word } from '../../utils/classes/word';
import { Ahead } from '../../utils/interfaces/AheadType';
@Injectable({
  providedIn: 'root',
})
export class AheadService {
  public _ahead = new Subject<Ahead>();
  public ahead$: Observable<Ahead> = this._ahead.asObservable();

  updateAheadWord(newData: Ahead) {
    this._ahead.next(newData);
  }
  // public _ahead = new Subject<string>();
  // public ahead$: Observable<string> = this._ahead.asObservable();

  // updateAheadWord(newData: string) {
  //   this._ahead.next(newData);
  // }
}
