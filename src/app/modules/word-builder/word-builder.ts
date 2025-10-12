import { Component } from '@angular/core';
import { WordBuilderService } from '../../services/word-builder-service/word-builder-service';
import { merge } from 'rxjs';
@Component({
  selector: 'app-word-builder',
  imports: [],
  templateUrl: './word-builder.html',
  styleUrl: './word-builder.scss',
})
export class WordBuilder {
  constructor(builder: WordBuilderService) {
    builder.wordBuilderObserve$ = merge();
  }
}
