import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, switchMap } from 'rxjs';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Word, WordInterface } from '../../../utils/classes/word';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

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
  public buildingWord: Word = new Word('', '', '');
  public empty: Word = new Word('', '', '');
  protected sendUp = output<any>();
  protected scrapeForm = new FormGroup({
    scrape: new FormControl(''),
  });

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
          const { definitions, partOfSpeech, examples } =
            word as unknown as WordInterface;
          this.buildingWord.partOfSpeech = partOfSpeech;
          this.buildingWord.definitions = definitions;
          this.buildingWord.examples = examples;
          this.buildingWord.translation = definitions[0];
          this.buildingWord.case = {};
          this.wiktion.pushInternalScrape(this.buildingWord);
        })
      )
      .subscribe();
  }

  protected submitScrapeWord(): void {
    const { scrape } = this.scrapeForm.value;
    this.wiktion.pushScrape(scrape as string);
    this.buildingWord.original = scrape as string;
    this.scrapeForm.reset();
  }
}
