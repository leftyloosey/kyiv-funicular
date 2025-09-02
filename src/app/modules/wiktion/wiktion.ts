import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Subscription, switchMap } from 'rxjs';
import { WiktionService } from '../../services/wiktion-service/wiktion-service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Word, WordInterface } from '../../utils/classes/word';

@Component({
  selector: 'app-wiktion',
  imports: [ReactiveFormsModule],
  templateUrl: './wiktion.html',
  styleUrl: './wiktion.scss',
})
export class Wiktion implements OnDestroy {
  bob: Subscription;
  buildingWord: Word = new Word('', '', '');
  private router = inject(Router);

  protected scrapeForm = new FormGroup({
    scrape: new FormControl(''),
  });

  constructor(private wiktion: WiktionService) {
    this.bob = wiktion.newScrape$
      .pipe(
        takeUntilDestroyed(),
        switchMap((word) => {
          return this.wiktion.scrapeOne(word);
        })
      )
      .pipe(
        map((word) => {
          const { definitions } = word as unknown as WordInterface;
          const { partOfSpeech } = word as unknown as WordInterface;
          const { examples } = word as unknown as WordInterface;
          this.buildingWord.definitions = definitions;
          this.buildingWord.partOfSpeech = partOfSpeech;
          this.buildingWord.examples = examples;
          this.buildingWord.translation = definitions[0];
          this.wiktion.pushInternalScrape(this.buildingWord);
          this.router.navigate(['/newword']);
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.bob.unsubscribe();
  }

  protected submitScrapeWord() {
    const { scrape } = this.scrapeForm.value;
    this.wiktion.pushScrape(scrape as string);
    this.buildingWord.original = scrape as string;
    this.scrapeForm.reset();
  }
}
