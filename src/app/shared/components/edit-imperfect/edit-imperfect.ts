import { AfterViewInit, Component, input, output } from '@angular/core';
import { ImperfCase, WordCase } from '../../../utils/classes/word';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-imperfect',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-imperfect.html',
  styleUrl: './edit-imperfect.scss',
})
export class EditImperfect implements AfterViewInit {
  sendUp = output<ImperfCase>();
  sendDown = input<WordCase>();

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

  onSendUp() {
    this.submitImperfect();
    this.sendUp.emit(this.buildingWord);
  }

  ngAfterViewInit(): void {
    const receivedCase = JSON.parse(JSON.stringify(this.sendDown()));
    if (Object.keys(receivedCase).length === 0) {
      console.log('empty');
    } else {
      this.buildingWord = this.sendDown() as ImperfCase;
      this.loopWordToForm(this.imperfectForm);
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
  submitImperfect() {
    this.loopFormToWord(this.imperfectForm);
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
