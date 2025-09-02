import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manual',
  imports: [ReactiveFormsModule],
  templateUrl: './manual.html',
  styleUrl: './manual.scss',
})
export class Manual {
  submitManualWord() {
    console.log(this.manualForm.value);
  }
  protected manualForm = new FormGroup({
    original: new FormControl(''),
    translation: new FormControl(''),
    partOfSpeech: new FormControl(''),
  });
}
