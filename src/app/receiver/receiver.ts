import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { from, PartialObserver } from 'rxjs';
@Component({
  selector: 'app-receiver',
  imports: [],
  templateUrl: './receiver.html',
  styleUrl: './receiver.css',
})
export class ReceiverComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getData();
  }

  // getData() {
  //   this.dataService.data.subscribe({
  //     next: (v) => console.log(`observerA: ${v}`), // you will receive the data from sender component here.
  //   });
  // }
  // getData2() {
  //   this.dataService.data.subscribe({
  //     next: (v) => console.log(`observerB: ${v}`), // you will receive the data from sender component here.
  //   });
  // }
  getData() {
    this.dataService.data.subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
    console.log('just after subscribe');
    // this.dataService.data.subscribe((response) => {
    //   console.log(response); // you will receive the data from sender component here.
    // });
  }
}
