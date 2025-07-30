import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-obsoiver',
  imports: [AsyncPipe],
  templateUrl: './obsoiver.html',
  styleUrl: './obsoiver.css',
})
export class Obsoiver {
  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
}
