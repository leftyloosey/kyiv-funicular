import {
  Component,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DisplayBoxService } from '../../../services/delivery-services/display-box-service/display-box-service';
import { newDefInterface } from '../../../utils/interfaces/NewExtraDetail';
import { wordDefinitions } from '../../../utils/interfaces/WordDefinitions';
// import { Word } from '../../../utils/classes/word';
@Component({
  selector: 'app-definition-edit',
  imports: [MatFormField, MatIcon, ReactiveFormsModule, MatInputModule],
  templateUrl: './definition-edit.html',
  styleUrl: './definition-edit.scss',
})
export class DefinitionEdit implements OnChanges {
  protected dynamicForm!: FormGroup;
  public definitions = input.required<string[]>();
  public type = input.required<string>();

  constructor(private fb: FormBuilder, private displayBox: DisplayBoxService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dynamicForm = this.fb.group({
      formArray: this.fb.array([this.createFormGroup1(this.definitions())]),
    });
    this.addAllGroups();
  }

  get formArray() {
    return this.dynamicForm.get('formArray') as FormArray;
  }

  private createFormGroup1(defs: string[]): FormGroup {
    if (defs[0]) {
      return this.fb.group({
        definition: [defs[0]],
      });
    } else {
      return this.fb.group({
        definition: [''],
      });
    }
  }
  private createSpecific(definition: string): FormGroup {
    return this.fb.group({
      definition: [definition],
    });
  }

  private populateGroup(definitions: string[]) {
    for (let index = 1; index < definitions.length; index++) {
      this.formArray.push(this.createSpecific(definitions[index]));
    }
  }

  private addAllGroups() {
    this.populateGroup(this.definitions());
  }

  protected addFormGroup() {
    this.formArray.push(this.createBlankFormGroup());
  }
  protected createBlankFormGroup(): FormGroup {
    return this.fb.group({
      definition: [''],
    });
  }
  protected removeFormGroup(index: number) {
    // setTimeout(() => {
    this.formArray.removeAt(index);
    // }, 0);
    this.toEdit();
  }

  public reset() {
    this.dynamicForm.reset();
    this.formArray.clear();
  }

  protected toEdit() {
    // protected toEdit(e: Event) {
    // e.preventDefault();
    const { formArray } = this.dynamicForm.value;
    // const newDefArray: string[] = [...this.definitions()];
    const newDefArray: string[] = [];

    for (const def of formArray) {
      const { definition } = def as unknown as newDefInterface;
      newDefArray.push(definition);
    }
    const modifiedArray: wordDefinitions = { [this.type()]: newDefArray };
    setTimeout(() => {
      this.displayBox.updateDefinitionBox(modifiedArray);
    }, 0);
  }
}
