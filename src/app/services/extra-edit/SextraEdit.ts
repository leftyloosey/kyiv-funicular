// import { FormGroup } from '@angular/forms';
import { Word } from '../../utils/classes/word';
// import { Word, WordWithId } from '../../utils/classes/word';
// import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { wordDefinitions } from '../../utils/interfaces/WordDefinitions';

@Injectable({
  providedIn: 'root',
})
export class SextraEdit {
  getRelevantExtraBlock(obs: Word, code: string): string[] {
    // getRelevantExtraBlock(obs: WordWithId, code: string): string[] {
    type MyObjectKeys = keyof typeof obs;

    function getPropertyValue(obj: typeof obs, key: MyObjectKeys) {
      return obj[key];
    }
    let dynamicKey: MyObjectKeys = code as keyof Word;
    const value = getPropertyValue(obs, dynamicKey);

    return value as string[];
  }
  // toEdit(workArray: string[], code: string) {
  //   const submitExmp: wordDefinitions = { [code]: workArray };
  //   return submitExmp;
  // }
}
