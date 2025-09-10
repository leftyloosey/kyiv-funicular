import { Component, input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.dynamicForm = this.fb.group({
    //   formArray: this.fb.array([this.addAllGroups(this.arr)]),
    // });
    console.log('in edit', this.definitions());
    this.dynamicForm = this.fb.group({
      formArray: this.fb.array([this.createFormGroup1(this.definitions())]),
      // formArray: this.fb.array([this.createFormGroup()]),
    });
    this.addAllGroups();
  }

  get formArray() {
    return this.dynamicForm.get('formArray') as FormArray;
  }

  createFormGroup1(defs: string[]): FormGroup {
    return this.fb.group({
      definition: [defs[0]],
    });
  }
  // createFormGroup(): FormGroup {
  //   return this.fb.group({
  //     definition: [''],
  //   });
  // }
  createSpecific(definition: string): FormGroup {
    return this.fb.group({
      definition: [definition],
    });
  }
  // createFormGroup(): FormGroup {
  //   return this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //   });
  // }

  populateGroup(definitions: string[]) {
    for (let index = 1; index < definitions.length; index++) {
      this.formArray.push(this.createSpecific(definitions[index]));
    }
  }

  addAllGroups() {
    this.populateGroup(this.definitions());
  }
  // addFormGroup1(defs: string[]) {
  //   this.formArray.push(this.createFormGroup1(defs));
  // }
  addFormGroup() {
    this.formArray.push(this.definitions());
  }
  // addFormGroup() {
  //   this.formArray.push(this.createFormGroup());
  // }

  removeFormGroup(index: number) {
    console.log('index', index);
    this.formArray.removeAt(index);
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  }
  toEdit(e: Event) {
    e.preventDefault();

    const { formArray } = this.dynamicForm.value;
    console.log(formArray);
    this.sendUpDef.emit(formArray);
  }
}
