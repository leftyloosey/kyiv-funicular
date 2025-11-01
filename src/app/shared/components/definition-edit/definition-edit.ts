import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
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
import { DefinitionEditService } from '../../../services/definition-edit-service/definition-edit-service';
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

  constructor(
    private fb: FormBuilder,
    protected defEdit: DefinitionEditService,
    private displayBox: DisplayBoxService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.dynamicForm = this.fb.group({
      formArray: this.fb.array([
        this.defEdit.createFormGroup1(this.definitions()),
      ]),
    });
    this.defEdit.addAllGroups(this.definitions(), this.formArray);
  }

  get formArray() {
    return this.dynamicForm.get('formArray') as FormArray;
  }

  protected removeFormGroup(index: number): void {
    this.formArray.removeAt(index);
    this.toEdit();
  }

  public reset(): void {
    this.dynamicForm.reset();
    this.formArray.clear();
  }

  protected toEdit(): void {
    const { formArray } = this.dynamicForm.value;
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
