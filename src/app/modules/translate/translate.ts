import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '../../services/translate-service/translate.service';
import { Observable, tap } from 'rxjs';
import { CreateTranslateDto, translatable } from './translatable';
// import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-translate',
  imports: [ReactiveFormsModule],
  templateUrl: './translate.html',
  styleUrl: './translate.scss',
})
export class Translate {
  protected displayWords = signal<translatable[]>([]);

  translate = inject(TranslateService);
  //  obs$: Observable<any>()
  translateForm = new FormGroup({
    word: new FormControl(''),
  });

  submitTranslateWord() {
    // console.log(this.translateForm.value);
    const { word } = this.translateForm.value;
    const submit: string = this.translateForm.value as string;
    console.log(word);
    this.translate
      .translateOne(word as string)
      .pipe(
        tap((word) => word),
        tap((word) => console.log(word))
      )
      .subscribe();
  }
  getWords() {
    this.translate.getAllWords().subscribe((words) => {
      return this.displayWords.set(words);
    });
  }
}
