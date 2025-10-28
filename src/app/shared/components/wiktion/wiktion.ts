import {
  Component,
  DestroyRef,
  inject,
  Inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { map, Observable, Subject, switchMap, tap } from 'rxjs';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Word, WordInterface } from '../../../utils/classes/word';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { LANGUAGE_TOKEN, lngToken } from '../../../utils/tokens/language-token';
import { LanguageToken } from '../../../services/language-token/language-token';

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
  private lngToken: lngToken = 'uk';

  constructor(
    @Inject(LANGUAGE_TOKEN) private languageToken: Subject<lngToken>,
    private wiktion: WiktionService,
    private router: Router,
    private token: LanguageToken
  ) {
    languageToken
      .pipe(
        takeUntilDestroyed(),
        tap((value) => {
          this.lngToken = value;
        })
      )
      .subscribe();

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
          this.buildingWord.original = this.toSubmit;
          this.wiktion.pushInternalScrape(this.buildingWord);
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
    this.wiktion.pushScrape({ word: this.toSubmit, tag: this.lngToken });
  }
}
