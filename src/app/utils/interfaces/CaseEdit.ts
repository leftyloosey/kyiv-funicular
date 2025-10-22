import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { WordCase } from '../classes/word';
import { caseToSend } from '../../services/case-delivery/case-delivery';

export abstract class CaseEdit {
  public buildingWord: WordCase;
  public bigType: WordCase;
  public isCaseHidden: boolean = true;
  protected dynamicForm!: FormGroup;

  constructor(
    protected myCase: WordCase,
    protected inj: WordCase,
    protected fb: FormBuilder
  ) {
    this.buildingWord = myCase;
    this.bigType = inj;
    this.fb = fb;
  }
  public toggleCase(): void {
    this.isCaseHidden = !this.isCaseHidden;
  }
  public getFb(): FormBuilder {
    return this.fb;
  }

  public loopFormToWord(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      this.buildingWord[key] = control?.value;
    });
  }
  public valsForForm(formArray: FormArray): string[] {
    const holder: string[] = [];
    const holder2: string[] = [];
    for (let index = 0; index < formArray.controls.length; index++) {
      holder.push(formArray.controls[index].value);
      for (const [key, value] of Object.entries(holder[index])) {
        holder2.push(key);
      }
    }
    return holder2;
  }
  public createSpecific(key: string, value: string): FormGroup {
    return this.fb.group({
      [key]: [value],
    });
  }
  public populateGroup(definitions: WordCase, formArray: FormArray): void {
    const newArray = [];
    for (const [key, value] of Object.entries(definitions)) {
      newArray.push({ key, value });
    }
    newArray.forEach((obj) => {
      formArray.push(this.createSpecific(obj.key, obj.value));
    });
  }
  public prepareForSend($event: WordCase): caseToSend {
    const { formArray } = $event;
    const rauch: WordCase = formArray;
    const bauch: WordCase = {};
    for (let index = 0; index < rauch['length']; index++) {
      const element = rauch[index];
      Object.assign(bauch, element);
    }
    const send: caseToSend = {
      case: bauch,
    };
    return send;
  }
}
