import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DefinitionEditService {
  public dynamicForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  public createFormGroup1(defs: string[]): FormGroup {
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
  public createBlankFormGroup(): FormGroup {
    return this.fb.group({
      definition: [''],
    });
  }

  public populateGroup(definitions: string[], formArray: FormArray): void {
    for (let index = 1; index < definitions.length; index++) {
      formArray.push(this.createSpecific(definitions[index]));
    }
  }

  public addAllGroups(definitions: string[], formArray: FormArray): void {
    this.populateGroup(definitions, formArray);
  }

  public createSpecific(definition: string): FormGroup {
    return this.fb.group({
      definition: [definition],
    });
  }
  public addFormGroup(formArray: FormArray): void {
    formArray.push(this.createBlankFormGroup());
  }
}
