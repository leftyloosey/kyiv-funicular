import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, firstValueFrom, tap } from 'rxjs';
import { Word, WordWithId } from '../../utils/classes/word';
import { TranslateService } from '../translate-service/translate.service';
import { OffsetService } from '../offset-service/offset-service';

@Injectable({
  providedIn: 'root',
})
export class WordBuilderService {
  public empty: Word = new Word('', '', '');
  public refresh: boolean = false;
  constructor(
    private translate: TranslateService,
    private offset: OffsetService
  ) {}

  public _wordBuilder = new BehaviorSubject<Word>(this.empty);
  public wordBuilderObserve$: Observable<Word> =
    this._wordBuilder.asObservable();

  public updateWordBuilder(newData: Word): void {
    this._wordBuilder.next(newData);
  }

  public async saveWord(word: Word): Promise<WordWithId> {
    const pretty = JSON.stringify(word, null, 2);
    let first = new WordWithId('', '', '');

    if (window.confirm(pretty)) {
      first = await firstValueFrom(
        this.translate.upsertWord(word).pipe(
          tap((word) => {
            if (word) this.offset.pageChange(0, word.tag);
          })
        )
      );
      window.alert('Word saved.');
      return first;
    } else {
      console.log('cancelled.');
    }
    return first;
  }

  public async deleteWord(word: Word): Promise<WordWithId> {
    let deleteID: string = '';
    let first = new WordWithId('', '', '');
    if (word.id) deleteID = word.id;

    if (window.confirm('Delete word?')) {
      first = await firstValueFrom(
        this.translate.deleteWord(deleteID).pipe(
          tap((word) => {
            if (word) this.offset.pageChange(0, word.tag);
          })
        )
      );
      window.alert('Word deleted.');
      return first;
    } else {
      console.log('cancelled.');
    }
    return first;
  }
}
