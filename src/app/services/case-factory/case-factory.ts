import { Injectable } from '@angular/core';
import { PracImp } from './prac-imp';
import { CaseEdit } from '../../utils/interfaces/CaseEdit';
import { WordCase } from '../../utils/classes/word';
import { YkHandler, DeHandler } from '../../utils/interfaces/CaseHandler';
import { FormBuilder } from '@angular/forms';
import { lngToken } from '../../utils/tokens/language-token';
@Injectable({
  providedIn: 'root',
})
export class CaseFactory {
  public fromCode(
    tag: lngToken,
    speechPart: string,
    caseInfo: WordCase
  ): CaseEdit {
    let kase: CaseEdit = new PracImp(caseInfo, {}, new FormBuilder());
    const handlers = [new DeHandler(), new YkHandler()];

    for (const handler of handlers) {
      if (handler.getCanProcess(tag)) {
        return handler.getCase(speechPart, caseInfo);
      }
    }
    return kase;
  }
}
