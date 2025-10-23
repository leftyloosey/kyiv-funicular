import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, switchMap, tap } from 'rxjs';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Word, WordInterface } from '../../../utils/classes/word';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatAnchor } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-wiktion',
  imports: [
    // ReactiveFormsModule,
    // MatAnchor
    MatButtonModule,
    MatIcon,
  ],
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
  private toSubmit: string = '';
  public buildingWord: Word = new Word('', '', '');
  public empty: Word = new Word('', '', '');
  protected sendUp = output<any>();
  // protected scrapeForm = new FormGroup({
  //   scrape: new FormControl(''),
  // });

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
  ngOnInit(): void {
    this.downPut()
      ?.pipe(
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
    console.log(this.toSubmit);
    // this.wiktion.pushScrape(this.toSubmit);

    // this.scrapeForm.reset();
    // const { scrape } = this.scrapeForm.value;
    // this.wiktion.pushScrape(scrape as string);
    // this.buildingWord.original = scrape as string;
    // this.scrapeForm.reset();
  }
}
