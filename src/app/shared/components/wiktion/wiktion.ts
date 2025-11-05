import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Word } from '../../../utils/classes/word';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-wiktion',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './wiktion.html',
  styleUrl: './wiktion.scss',
})
export class Wiktion implements OnInit {
  public downPut = input<
    Observable<
      Partial<{
        original: string | null;
        // translation: string | null;
        // partOfSpeech: string | null;
      }>
    >
  >();
  private readonly destroyRef = inject(DestroyRef);
  public buildingWord: Word = new Word('', '', '');
  protected sendUp = output<any>();
  private toSubmit: string = '';

  constructor(private wiktion: WiktionService, private router: Router) {
    wiktion.newScrape$
      .pipe(
        takeUntilDestroyed(),
        switchMap((word) => {
          return this.wiktion.scrapeOne(word);
        })
      )
      .pipe(
        map((word) => {
          this.sendUp.emit(null);
          const { definitions, partOfSpeech, examples, tag } = word;
          this.buildingWord.partOfSpeech = partOfSpeech;
          this.buildingWord.definitions =
            this.wiktion.loopDefsToWord(definitions);
          this.buildingWord.examples = examples;
          this.buildingWord.translation = definitions[0];
          this.buildingWord.case = {};
          this.buildingWord.original = this.toSubmit;
          this.buildingWord.tag = tag;
          console.log(
            'word about to be pushed to builder from wik',
            this.buildingWord
          );
          this.wiktion.pushInternalScrape(this.buildingWord);
          this.buildingWord = new Word('', '', '');
        })
      )
      .subscribe();
  }
  ngOnInit(): void {
    this.downPut()
      ?.pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((word) => {
          const { original } = word;
          if (original) {
            this.toSubmit = original;
          }
        })
      )
      .subscribe();
  }

  protected submitScrapeWord(): void {
    this.wiktion.pushScrape({ word: this.toSubmit });
  }
}
