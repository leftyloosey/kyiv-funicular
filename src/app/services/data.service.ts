import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataByEvent: EventEmitter<string> = new EventEmitter<string>();
  private dataSource: Subject<string> = new BehaviorSubject<string>(
    'Initial Value'
  );
  // private dataSource: BehaviorSubject<string> = new BehaviorSubject<string>(
  //   'Initial Value'
  // );
  data: Observable<string> = this.dataSource.asObservable();
  // time = new Observable<string>((observer: Observer<string>) => {
  //   setInterval(() => observer.next(new Date().toString()), 1000);
  // });
  constructor() {}

  sendData(data: string) {
    this.dataSource.next(data);
    this.dataSource.next('yo');
    this.dataSource.next('yo1');
    this.dataSource.next('yo2');
  }
  sendDataEasternSummer(data: string) {
    // this.dataSource.next(data);

    setInterval(() => this.dataSource.next(data), 1000);
  }
  sendDataByEvent(data: string) {
    this.dataByEvent.emit(data);
  }
}
