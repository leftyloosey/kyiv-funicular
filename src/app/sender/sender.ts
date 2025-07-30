import { Component, OnChanges, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-sender',
  imports: [],
  templateUrl: './sender.html',
  styleUrl: './sender.css',
})
export class SenderComponent implements OnInit, OnChanges {
  strangDate: string = '';

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.getData();
    this.sendNewData('and this');
    this.sendNewData('and this and this');
    this.sendNewData('and this and this and this');
  }
  ngOnChanges(): void {}

  sendNewData(data: string) {
    this.dataService.sendData(data);
  }
  sendEasternSummer(data: string) {
    this.dataService.sendDataEasternSummer(data);
  }

  getData() {
    this.dataService.data.subscribe((response) => {
      console.log(response); // you will receive the data from sender component here.
    });
  }
}
