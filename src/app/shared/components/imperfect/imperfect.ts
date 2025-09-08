import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImperfCase } from '../../../utils/classes/word';

@Component({
  selector: 'app-imperfect',
  imports: [ReactiveFormsModule],
  templateUrl: './imperfect.html',
  styleUrl: './imperfect.scss',
})
export class Imperfect {
  sendUp = output<ImperfCase>();

  buildingWord: ImperfCase = {
    aspect: '',
    malePast: '',
    femPast: '',
    plurPast: '',
    firstPresent: '',
    InfPresent2nd: '',
    FormPresent2nd: '',
    present3rd: '',
    plurPresent: '',
    wePresent: '',
    firstFuture: '',
    InfFuture2nd: '',
    FormFuture2nd: '',
    future3rd: '',
    plurFuture: '',
    weFuture: '',
  };
  loopFormToWord(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      for (let property in this.buildingWord) {
        this.buildingWord[key] = control?.value;
      }
    });
  }
  onSendUp() {
    this.submitImperfect();
    this.sendUp.emit(this.buildingWord);
  }
  submitImperfect() {
    this.loopFormToWord(this.imperfectForm);
    console.log(this.buildingWord);
  }
  protected imperfectForm = new FormGroup({
    aspect: new FormControl(this.buildingWord.aspect),
    malePast: new FormControl(this.buildingWord.malePast),
    femPast: new FormControl(this.buildingWord.femPast),
    plurPast: new FormControl(this.buildingWord.plurPast),
    firstPresent: new FormControl(this.buildingWord.firstPresent),
    InfPresent2nd: new FormControl(this.buildingWord.InfPresent2nd),
    FormPresent2nd: new FormControl(this.buildingWord.FormPresent2nd),
    present3rd: new FormControl(this.buildingWord.present3rd),
    plurPresent: new FormControl(this.buildingWord.plurPresent),
    wePresent: new FormControl(this.buildingWord.wePresent),
    firstFuture: new FormControl(this.buildingWord.firstFuture),
    InfFuture2nd: new FormControl(this.buildingWord.InfFuture2nd),
    FormFuture2nd: new FormControl(this.buildingWord.FormFuture2nd),
    future3rd: new FormControl(this.buildingWord.future3rd),
    plurFuture: new FormControl(this.buildingWord.plurFuture),
    weFuture: new FormControl(this.buildingWord.weFuture),
  });
}
