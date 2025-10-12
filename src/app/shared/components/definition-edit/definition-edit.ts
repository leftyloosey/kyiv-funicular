import { Component, input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { WiktionService } from '../../../services/wiktion-service/wiktion-service';

@Component({
  selector: 'app-definition-edit',
  imports: [MatFormField, MatIcon, ReactiveFormsModule, MatInputModule],
  templateUrl: './definition-edit.html',
  styleUrl: './definition-edit.scss',
})
export class DefinitionEdit implements OnInit {
  dynamicForm!: FormGroup;
  sendUpDef = output<string[]>();
  definitions = input.required<string[]>();

  constructor(private fb: FormBuilder, private wiktion: WiktionService) {}

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      formArray: this.fb.array([this.createFormGroup1(this.definitions())]),
    });
    this.addAllGroups();
  }

  get formArray() {
    return this.dynamicForm.get('formArray') as FormArray;
  }

  createFormGroup1(defs: string[]): FormGroup {
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
  createSpecific(definition: string): FormGroup {
    return this.fb.group({
      definition: [definition],
    });
  }

  populateGroup(definitions: string[]) {
    for (let index = 1; index < definitions.length; index++) {
      this.formArray.push(this.createSpecific(definitions[index]));
    }
  }

  addAllGroups() {
    this.populateGroup(this.definitions());
  }

  addFormGroup() {
    this.formArray.push(this.createBlankFormGroup());
  }
  createBlankFormGroup(): FormGroup {
    return this.fb.group({
      definition: [''],
    });
  }
  removeFormGroup(index: number) {
    this.formArray.removeAt(index);
  }

  public reset() {
    this.dynamicForm.reset();
    this.formArray.clear();
  }

  toEdit(e: Event) {
    e.preventDefault();

    const { formArray } = this.dynamicForm.value;
    const newDefArray: string[] = [];

    interface newDefInterface {
      definition: string;
    }

    for (const def of formArray) {
      const { definition } = def as unknown as newDefInterface;
      newDefArray.push(definition);
    }
    this.wiktion.updateDefinitionData(newDefArray);
  }
}
