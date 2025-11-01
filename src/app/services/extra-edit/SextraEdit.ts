import { Word } from '../../utils/classes/word';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SextraEdit {
  getRelevantExtraBlock(obs: Word, code: string): string[] {
    type objKeys = keyof typeof obs;

    function getPropertyValue(obj: typeof obs, key: objKeys) {
      return obj[key];
    }
    let dynamicKey: objKeys = code as keyof Word;
    const value = getPropertyValue(obs, dynamicKey);

    return value as string[];
  }
}
