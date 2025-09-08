import { Component, input, OnInit } from '@angular/core';
import { Word } from '../../../utils/classes/word';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-quiz-card',
  imports: [JsonPipe],
  templateUrl: './quiz-card.html',
  styleUrl: './quiz-card.scss',
})
export class QuizCard implements OnInit {
  word = input.required<Word>();
  case: string[] = [];
  // case: string[] = [];
  constructor() {
    // this.case = JSON.parse(JSON.stringify(this.word().case));
    // console.log(this.case);
  }
  ngOnInit(): void {
    this.case = JSON.parse(JSON.stringify(this.word().case));
    console.log(this.case);
  }

  detailsHidden: boolean = true;
  detailsHidden2: boolean = true;

  toggleHidden(): void {
    this.detailsHidden = !this.detailsHidden;
    this.detailsHidden2 = true;
  }
  toggleHidden2() {
    this.toggleHidden();
    this.detailsHidden2 = !this.detailsHidden2;
  }
}
