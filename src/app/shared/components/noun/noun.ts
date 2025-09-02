import { Component } from '@angular/core';
import { NounCase } from '../../../utils/classes/word';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-noun',
  imports: [ReactiveFormsModule],
  templateUrl: './noun.html',
  styleUrl: './noun.scss',
})
export class Noun {
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
  submitNoun() {
    console.log(this.nounForm.value);
  }
  protected nounForm = new FormGroup({
    singNom: new FormControl(this.buildingWord.singNom),
    singAcc: new FormControl(this.buildingWord.singAcc),
    singGen: new FormControl(this.buildingWord.singGen),
    singDat: new FormControl(this.buildingWord.singDat),
    singIns: new FormControl(this.buildingWord.singIns),
    singLoc: new FormControl(this.buildingWord.singLoc),
    singVoc: new FormControl(this.buildingWord.singVoc),
    plurNom: new FormControl(this.buildingWord.plurNom),
    plurAcc: new FormControl(this.buildingWord.plurAcc),
    plurGen: new FormControl(this.buildingWord.plurGen),
    plurDat: new FormControl(this.buildingWord.plurDat),
    plurIns: new FormControl(this.buildingWord.plurIns),
    plurLoc: new FormControl(this.buildingWord.plurLoc),
    plurVoc: new FormControl(this.buildingWord.plurVoc),
  });
}
