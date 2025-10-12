import {
  Component,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import {
  WordWithId,
  UnpackCase,
  CaseDisplay,
} from '../../../utils/classes/word';
import { NgTemplateOutlet } from '@angular/common';
import { QUIZ } from '../../../utils/tokens/quizzable';
import { OffsetService } from '../../../services/offset-service/offset-service';
@Component({
  selector: 'app-basic-quiz',
  imports: [NgTemplateOutlet],
  templateUrl: './basic-quiz.html',
  styleUrl: './basic-quiz.scss',
  providers: [
    {
      provide: QUIZ,
      useExisting: BasicQuiz,
    },
  ],
})
export class BasicQuiz implements OnChanges {
  word = input.required<WordWithId>();
  kase: UnpackCase = { kase: {} };
  rayo: CaseDisplay[] = [];
  sendUp = output<WordWithId>();

  constructor(protected offset: OffsetService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { word } = changes;
    if (word.currentValue.case) {
      this.kase = new UnpackCase(word.currentValue.case);
      this.rayo = [];
      for (let [tense, value] of Object.entries(this.kase.kase)) {
        if (tense && value) this.rayo.push({ tense, value });
      }
    }
  }
}
