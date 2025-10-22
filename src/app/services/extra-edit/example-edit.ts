import { Injectable } from '@angular/core';
import { ExtraEdit } from '../../utils/interfaces/ExtraEdit';
import { FormGroup } from '@angular/forms';
// import { wordDefinitions } from '../../utils/classes/word';
import { wordDefinitions } from '../../utils/interfaces/WordDefinitions';

@Injectable({
  providedIn: 'root',
})
export class ExampleEdit implements ExtraEdit {
  // constructor() {

  // }
  // toEdit(dynamicForm: FormGroup) {
  //   const { formArray } = dynamicForm.value;
  //   const newExmpArray: string[] = [];
  //   console.log('to edit', formArray);
  //   interface newExmpInterface {
  //     definition: string;
  //   }
  toEdit(workArray: string[]) {
    // const { formArray } = dynamicForm.value;
    // const newExmpArray: string[] = [];
    // console.log('to edit', formArray);
    // interface newExmpInterface {
    //   example: string;
    // }

    // for (const exmp of workArray) {
    //   const { example } = exmp as unknown as newExmpInterface;
    //   const example = definition;
    //   newExmpArray.push(example);
    // }
    // const submitExmp: wordDefinitions = { examples: newExmpArray };

    const submitExmp: wordDefinitions = { examples: {} };
    console.log('examp', submitExmp);
    return submitExmp;
    // this.wiktion.updateDefinitionData(newDefArray);
    // this.displayBox.updateDefinitionBox(submitDef);
  }
}
