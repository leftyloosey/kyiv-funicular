import { Component, inject, input } from '@angular/core';
import { Word, WordWithId } from '../../../utils/classes/word';
import { JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quiz-card',
  imports: [JsonPipe],
  templateUrl: './quiz-card.html',
  styleUrl: './quiz-card.scss',
})
export class QuizCard {
  word = input.required<Word>();
  case: string[] = [];
  dialog = inject(MatDialog);
  router = inject(Router);
  wiktion = inject(WiktionService);
  detailsHidden: boolean = true;
  detailsHidden2: boolean = true;

  patchWord: WordWithId = {
    definitions: [],
    examples: [],
    case: {},
    original: '',
    translation: '',
    partOfSpeech: '',
    id: '',
  };

  toggleHidden(): void {
    this.detailsHidden = !this.detailsHidden;
    this.detailsHidden2 = true;
  }
  toggleHidden2() {
    this.toggleHidden();
    this.detailsHidden2 = !this.detailsHidden2;
  }
}
