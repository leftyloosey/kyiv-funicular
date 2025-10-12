import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, switchMap } from 'rxjs';
import { WiktionService } from '../../services/wiktion-service/wiktion-service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Word, WordInterface } from '../../utils/classes/word';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-wiktion',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './wiktion.html',
  styleUrl: './wiktion.scss',
})
export class Wiktion {
  buildingWord: Word = new Word('', '', '');
  // private router = inject(Router);

  protected scrapeForm = new FormGroup({
    scrape: new FormControl(''),
  });

  constructor(private wiktion: WiktionService, private router: Router) {
    wiktion.newScrape$
      // this.bob = wiktion.newScrape$
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

  protected submitScrapeWord() {
    const { scrape } = this.scrapeForm.value;
    this.wiktion.pushScrape(scrape as string);
    this.buildingWord.original = scrape as string;
    this.scrapeForm.reset();
  }
}
