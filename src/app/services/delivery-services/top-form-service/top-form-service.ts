import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
// import { WordWithId } from '../../utils/classes/word';
import { topValues } from '../../../utils/interfaces/TopValues';

@Injectable({
  providedIn: 'root',
})
export class TopFormService {
  public _topForm = new Subject<topValues>();
  public wordTopFormObserve$: Observable<topValues> =
    this._topForm.asObservable();

  public updateTopForm(newData: topValues) {
    this._topForm.next(newData);
  }
}
