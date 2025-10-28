import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { WordBuilderService } from '../../../services/delivery-services/word-builder-service/word-builder-service';
import { DEF, EXMP } from '../../../utils/constants/factory-types';
import { ExtraBlock } from '../extra-block/extra-block';
import { Word } from '../../../utils/classes/word';
import { AsyncPipe } from '@angular/common';
import { SHUT2 } from '../../../utils/tokens/closeable';
import { Closeable } from '../../../utils/interfaces/Closeable';
@Component({
  selector: 'app-display-box',
  imports: [ExtraBlock, AsyncPipe],
  templateUrl: './display-box.html',
  styleUrl: './display-box.scss',
  providers: [
    {
      provide: SHUT2,
      useExisting: DisplayBox,
    },
  ],
})
// export class DisplayBox {
export class DisplayBox implements Closeable {
  @ViewChild('xtra1')
  public xtra1?: ExtraBlock;
  @ViewChild('xtra2')
  public xtra2?: ExtraBlock;
  protected def: string = DEF;
  protected exmp: string = EXMP;
  output$: Observable<Word>;

  constructor(private builder: WordBuilderService) {
    // this.builder.wordBuilderObserve$.pipe(takeUntilDestroyed()).subscribe();
    this.output$ = this.builder.wordBuilderObserve$;
  }
  shut(): void {
    this.xtra1?.shut();
    this.xtra2?.shut();
  }
}
