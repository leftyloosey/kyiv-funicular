import { FormGroup } from '@angular/forms';
import { WordWithId } from '../classes/word';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { wordDefinitions } from './WordDefinitions';

// @Injectable({
//   providedIn: 'root',
// })
// export abstract class ExtraEdit {

//   abstract toEdit(array: string[]): wordDefinitions;
//   abstract extraBlockObserveType(): Observable<WordWithId>;

//   getRelevantExtraBlock(obs: WordWithId, code: string): string[] {
//     // getRelevantExtraBlock(obs: WordWithId, code: string): WordWithId {
//     type MyObjectKeys = keyof typeof obs;

//     function getPropertyValue(obj: typeof obs, key: MyObjectKeys) {
//       return obj[key];
//     }
//     let dynamicKey: MyObjectKeys = code as keyof WordWithId;

//     const value = getPropertyValue(obs, dynamicKey);
//     console.log('value!!', value);
//     return value as string[];
//   }
// }
export interface ExtraEdit {
  toEdit: (array: string[]) => wordDefinitions;
}
