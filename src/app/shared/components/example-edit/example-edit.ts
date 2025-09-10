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

@Component({
  selector: 'app-example-edit',
  imports: [MatFormField, MatIcon, ReactiveFormsModule, MatInputModule],
  templateUrl: './example-edit.html',
  styleUrl: './example-edit.scss',
})
export class ExampleEdit implements OnInit {
  dynamicForm!: FormGroup;
  sendUpExmp = output<string[]>();
  examples = input.required<string[]>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      formArray: this.fb.array([this.createFormGroup1(this.examples())]),
    });
    this.addAllGroups();
  }

  get formArray() {
    return this.dynamicForm.get('formArray') as FormArray;
  }

  createFormGroup1(exmps: string[]): FormGroup {
    // return this.fb.group({
    //   example: [defs[0]],
    // });
    if (exmps[0]) {
      return this.fb.group({
        example: [exmps[0]],
      });
    } else {
      return this.fb.group({
        example: [''],
      });
    }
  }
  createSpecific(example: string): FormGroup {
    return this.fb.group({
      example: [example],
    });
  }

  populateGroup(examples: string[]) {
    for (let index = 1; index < examples.length; index++) {
      this.formArray.push(this.createSpecific(examples[index]));
    }
  }

  addAllGroups() {
    this.populateGroup(this.examples());
  }

  addFormGroup() {
    // this.formArray.push(this.examples());
    this.formArray.push(this.createBlankFormGroup());
  }
  createBlankFormGroup(): FormGroup {
    return this.fb.group({
      example: [''],
    });
  }
  removeFormGroup(index: number) {
    this.formArray.removeAt(index);
  }

  onSubmit() {
    console.log('submit in example form', this.dynamicForm.value);
  }
  toEdit(e: Event) {
    e.preventDefault();

    const { formArray } = this.dynamicForm.value;

    this.sendUpExmp.emit(formArray);
  }
}
