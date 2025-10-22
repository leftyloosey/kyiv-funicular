import { Injectable } from '@angular/core';
import { WordCase } from '../../utils/classes/word';
import { Subject, Observable } from 'rxjs';
export type caseToSend = {
  case: WordCase;
};
@Injectable({
  providedIn: 'root',
})
export class CaseDelivery {
  public _caseDelivery = new Subject<caseToSend>();
  public caseDeliveryObserve$: Observable<caseToSend> =
    this._caseDelivery.asObservable();
  public updateCaseDelivery(newData: caseToSend) {
    this._caseDelivery.next(newData);
  }
}
