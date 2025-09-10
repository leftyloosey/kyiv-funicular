import { Component, OnInit } from '@angular/core';
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
  selector: 'app-dynamic-form',
  imports: [MatFormField, MatIcon, ReactiveFormsModule, MatInputModule],
  templateUrl: './dynamic-form.html',
  styleUrls: ['./dynamic-form.scss'],
})
export class DynamicFormComponent implements OnInit {
  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      formArray: this.fb.array([this.createFormGroup()]),
    });
  }

  get formArray() {
    return this.dynamicForm.get('formArray') as FormArray;
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addFormGroup() {
    this.formArray.push(this.createFormGroup());
  }

  removeFormGroup(index: number) {
    this.formArray.removeAt(index);
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  }
}
