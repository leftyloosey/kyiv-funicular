// import { Component, signal } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { TranslateService } from '../../services/translate-service/translate.service';
// import { translatable } from './translatable';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { map, pipe, switchMap } from 'rxjs';

// @Component({
//   selector: 'app-translate',
//   imports: [ReactiveFormsModule],
//   templateUrl: './translate.html',
//   styleUrl: './translate.scss',
// })
// export class Translate {
//   protected displayWords = signal<translatable[]>([]);

//   protected translateForm = new FormGroup({
//     word: new FormControl(''),
//   });

//   constructor(private translate: TranslateService) {

//     translate
//       .getAllWords()
//       .pipe(
//         takeUntilDestroyed(),
//         map((words) => {
//           words.reverse();
//           return this.displayWords.set(words);
//         })
//       )
//       .subscribe();

//     translate.wordDelivery$
//       .pipe(
//         takeUntilDestroyed(),
//         switchMap((toBeTranslated) => {
//           return translate.translateOne(toBeTranslated as string);
//         })
//       )
//       .pipe(
//         map((translatedWord) => {
//           this.displayWords.update((existingWords) => [
//             translatedWord,
//             ...existingWords,
//           ]);
//         })
//       )
//       .subscribe();
//   }

//   public pushTranslate(word: string) {
//     this.translate.wordDelivery$.next(word);
//   }

//   protected submitTranslateWord() {
//     const { word } = this.translateForm.value;
//     this.pushTranslate(word as string);
//     this.translateForm.reset();
//   }

//   // protected getWordsFromBackend() {
//   //   this.translate.getAllWords().subscribe((words) => {
//   //     words.reverse();
//   //     return this.displayWords.set(words);
//   //   });
//   // }
// }
