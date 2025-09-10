import { AfterViewInit, Component, input, output } from '@angular/core';
import { NounCase, WordCase } from '../../../utils/classes/word';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-noun',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-noun.html',
  styleUrl: './edit-noun.scss',
})
export class EditNoun implements AfterViewInit {
  buildingWord: NounCase = {
    singNom: '',
    singAcc: '',
    singGen: '',
    singDat: '',
    singIns: '',
    singLoc: '',
    singVoc: '',
    plurNom: '',
    plurAcc: '',
    plurGen: '',
    plurDat: '',
    plurIns: '',
    plurLoc: '',
    plurVoc: '',
  };
  sendUp = output<NounCase>();
  sendDown = input<WordCase>();
  nounForm!: FormGroup;

  onSendUp() {
    this.submitNoun();
    this.sendUp.emit(this.buildingWord);
  }
  ngAfterViewInit(): void {
    const receivedCase = JSON.parse(JSON.stringify(this.sendDown()));
    if (Object.keys(receivedCase).length === 0) {
      console.log('empty');
    } else {
      this.buildingWord = this.sendDown() as NounCase;
      this.loopWordToForm(this.nounForm);
    }
  }
  loopFormToWord(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      for (let property in this.buildingWord) {
        this.buildingWord[key] = control?.value;
      }
    });
  }
  loopWordToForm(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      control?.setValue(this.buildingWord[key]);
    });
  }
  submitNoun() {
    this.loopFormToWord(this.nounForm);
  }
  constructor(private fb: FormBuilder) {
    this.nounForm = this.fb.group({
      singNom: [this.buildingWord.singNom],
      singAcc: [this.buildingWord.singAcc],
      singGen: [this.buildingWord.singGen],
      singDat: [this.buildingWord.singDat],
      singIns: [this.buildingWord.singIns],
      singLoc: [this.buildingWord.singLoc],
      singVoc: [this.buildingWord.singVoc],

      plurNom: [this.buildingWord.plurNom],
      plurAcc: [this.buildingWord.plurAcc],
      plurGen: [this.buildingWord.plurGen],
      plurDat: [this.buildingWord.plurDat],
      plurIns: [this.buildingWord.plurIns],
      plurLoc: [this.buildingWord.plurLoc],
      plurVoc: [this.buildingWord.plurLoc],
    });
  }
}
