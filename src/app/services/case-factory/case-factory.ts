import { Injectable } from '@angular/core';
import { PracImp } from './prac-imp';
import { CaseEdit } from '../../utils/interfaces/CaseEdit';
import { WordCase } from '../../utils/classes/word';
import { ImperfClass } from '../../utils/classes/Imperf';
import { NounClass } from '../../utils/classes/Noun';
import { AdjClass } from '../../utils/classes/AdjClass';
import { FormBuilder } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class CaseFactory {
  fromCode(code: string, caseInfo: WordCase): CaseEdit {
    switch (code) {
      case 'Verb':
        return new PracImp(caseInfo, new ImperfClass(''), new FormBuilder());
      case 'Noun':
        return new PracImp(caseInfo, new NounClass(), new FormBuilder());
      case 'Adjective':
        return new PracImp(caseInfo, new AdjClass(), new FormBuilder());
      default:
        return new PracImp(caseInfo, {}, new FormBuilder());
    }
  }
}
