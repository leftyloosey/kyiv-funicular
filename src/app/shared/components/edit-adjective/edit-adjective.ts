import {
  AfterViewInit,
  Component,
  input,
  OnDestroy,
  output,
} from '@angular/core';
import { AdjCase, WordCase } from '../../../utils/classes/word';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-adjective',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-adjective.html',
  styleUrl: './edit-adjective.scss',
})
export class EditAdjective implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('adjective destroyed!');
  }
  buildingWord: AdjCase = {
    malNom: '',
    malAcc: '',
    malGen: '',
    malDat: '',
    malIns: '',
    malLoc: '',
    malVoc: '',

    femNom: '',
    femAcc: '',
    femGen: '',
    femDat: '',
    femIns: '',
    femLoc: '',
    femVoc: '',

    neuNom: '',
    neuAcc: '',
    neuGen: '',
    neuDat: '',
    neuIns: '',
    neuLoc: '',
    neuVoc: '',

    plurNom: '',
    plurAcc: '',
    plurGen: '',
    plurDat: '',
    plurIns: '',
    plurLoc: '',
    plurVoc: '',
  };
  sendUp = output<AdjCase>();
  sendDown = input<WordCase>();
  // adjForm!: FormGroup;

  onSendUp() {
    this.submitAdjective();
    console.log(this.buildingWord);
    console.log(this.adjForm.controls);
    this.sendUp.emit(this.buildingWord);
  }
  ngAfterViewInit(): void {
    const receivedCase = JSON.parse(JSON.stringify(this.sendDown()));
    if (Object.keys(receivedCase).length === 0) {
      console.log('empty');
    } else {
      this.buildingWord = this.sendDown() as AdjCase;
      this.loopWordToForm(this.adjForm);
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
  submitAdjective() {
    console.log(this.buildingWord);
    this.loopFormToWord(this.adjForm);
  }
  protected adjForm = new FormGroup({
    malNom: new FormControl(this.buildingWord.malNom),
    malAcc: new FormControl(this.buildingWord.malAcc),
    malGen: new FormControl(this.buildingWord.malGen),
    malDat: new FormControl(this.buildingWord.malDat),
    malIns: new FormControl(this.buildingWord.malIns),
    malLoc: new FormControl(this.buildingWord.malLoc),
    malVoc: new FormControl(this.buildingWord.malVoc),

    femNom: new FormControl(this.buildingWord.femNom),
    femAcc: new FormControl(this.buildingWord.femAcc),
    femGen: new FormControl(this.buildingWord.femGen),
    femDat: new FormControl(this.buildingWord.femDat),
    femIns: new FormControl(this.buildingWord.femIns),
    femLoc: new FormControl(this.buildingWord.femLoc),
    femVoc: new FormControl(this.buildingWord.femVoc),

    neuNom: new FormControl(this.buildingWord.neuNom),
    neuAcc: new FormControl(this.buildingWord.neuAcc),
    neuGen: new FormControl(this.buildingWord.neuGen),
    neuDat: new FormControl(this.buildingWord.neuDat),
    neuIns: new FormControl(this.buildingWord.neuIns),
    neuLoc: new FormControl(this.buildingWord.neuLoc),
    neuVoc: new FormControl(this.buildingWord.neuVoc),

    plurNom: new FormControl(this.buildingWord.plurNom),
    plurAcc: new FormControl(this.buildingWord.plurAcc),
    plurGen: new FormControl(this.buildingWord.plurGen),
    plurDat: new FormControl(this.buildingWord.plurDat),
    plurIns: new FormControl(this.buildingWord.plurIns),
    plurLoc: new FormControl(this.buildingWord.plurLoc),
    plurVoc: new FormControl(this.buildingWord.plurVoc),
  });
}
