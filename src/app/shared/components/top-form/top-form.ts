import { Component, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';
import { TopFormService } from '../../../services/top-form-service/top-form-service';
import { Observable, startWith, tap } from 'rxjs';
import { topValues } from '../../../utils/interfaces/TopValues';
import { WordBuilderService } from '../../../services/word-builder-service/word-builder-service';
import { Word } from '../../../utils/classes/word';
import { AsyncPipe } from '@angular/common';
import { switchPartSpeech } from '../../../utils/functions/functions';

@Component({
  selector: 'app-top-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogContent,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './top-form.html',
  styleUrl: './top-form.scss',
})
export class TopForm {
  protected speechChange = output<null>();
  private valuesToSend: topValues = {
    original: '',
    translation: '',
    partOfSpeech: '',
  };

  protected manualForm = new FormGroup({
    original: new FormControl(''),
    translation: new FormControl(''),
    partOfSpeech: new FormControl(''),
  });

  protected input$: Observable<Word>;
  protected vals$: Observable<Partial<topValues>>;

  protected formValues$ = this.manualForm.valueChanges;

  constructor(
    private topForm: TopFormService,
    private builder: WordBuilderService
  ) {
    this.input$ = builder.wordBuilderObserve$.pipe(
      tap((items) => {
        const switched = switchPartSpeech(items.partOfSpeech);
        this.manualForm.patchValue({
          original: items.original,
          partOfSpeech: switched,
          // partOfSpeech: items.partOfSpeech,
          translation: items.translation,
        });
      })
    );

    this.vals$ = this.formValues$.pipe(
      startWith(this.valuesToSend),
      tap((values) => {
        const { original, translation, partOfSpeech } = values;
        this.valuesToSend = {
          original: original as string,
          translation: translation as string,
          partOfSpeech: partOfSpeech as string,
        };
      })
    );
  }

  protected submitToBuilder(): void {
    this.topForm.updateTopForm(this.valuesToSend);
  }
  protected speechChanged(): void {
    this.speechChange.emit(null);
  }
}

// import { Component, output } from '@angular/core';
// import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogContent } from '@angular/material/dialog';
// import { TopFormService } from '../../../services/top-form-service/top-form-service';
// import { tap } from 'rxjs';
// import { topValues } from '../../../utils/interfaces/TopValues';
// import { WordBuilderService } from '../../../services/word-builder-service/word-builder-service';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// @Component({
//   selector: 'app-top-form',
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule,
//     MatDialogContent,
//     ReactiveFormsModule,
//   ],
//   templateUrl: './top-form.html',
//   styleUrl: './top-form.scss',
// })
// export class TopForm {
//   speechChange = output<null>();
//   private valuesToSend: topValues = {
//     original: '',
//     translation: '',
//     partOfSpeech: '',
//   };

//   protected manualForm = new FormGroup({
//     original: new FormControl(''),
//     translation: new FormControl(''),
//     partOfSpeech: new FormControl(''),
//   });

//   protected formValues$ = this.manualForm.valueChanges;

//   constructor(
//     private topForm: TopFormService,
//     private builder: WordBuilderService
//   ) {
//     builder.wordBuilderObserve$
//       .pipe(
//         takeUntilDestroyed(),
//         tap((items) => {
//           this.manualForm.patchValue({
//             original: items.original,
//             partOfSpeech: items.partOfSpeech,
//             translation: items.translation,
//           });
//         })
//       )
//       .subscribe();

//     this.formValues$
//       .pipe(
//         takeUntilDestroyed(),
//         tap((values) => {
//           const { original, translation, partOfSpeech } = values;
//           this.valuesToSend = {
//             original: original as string,
//             translation: translation as string,
//             partOfSpeech: partOfSpeech as string,
//           };
//         })
//       )
//       .subscribe();
//   }

//   protected submitToBuilder(): void {
//     this.topForm.updateTopForm(this.valuesToSend);
//   }
//   protected speechChanged() {
//     this.speechChange.emit(null);
//   }
// }
