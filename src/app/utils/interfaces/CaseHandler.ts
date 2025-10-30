import { FormBuilder } from '@angular/forms';
import { PracImp } from '../../services/case-factory/prac-imp';
import { AdjClass } from '../classes/AdjClass';
import { ImperfClass } from '../classes/Imperf';
import { NounClass } from '../classes/Noun';
import { WordCase } from '../classes/word';
import { lngToken } from '../tokens/language-token';
import { CaseEdit } from './CaseEdit';
import { GermanClass } from '../classes/German';

export interface CaseHandler {
  canProcess: boolean;
  getCanProcess(tag: lngToken): boolean;
  getCase(speechPart: string, caseInfo: WordCase): CaseEdit;
}

export class YkHandler implements CaseHandler {
  public canProcess: boolean = false;
  public getCanProcess(tag: lngToken): boolean {
    if (tag === 'de') return this.canProcess;
    return this.canProcess;
  }

  getCase(speechPart: string, caseInfo: WordCase): CaseEdit {
    switch (speechPart) {
      case 'Verb':
        return new PracImp(caseInfo, new ImperfClass(''), new FormBuilder());
      case 'Noun':
        return new PracImp(caseInfo, new NounClass(), new FormBuilder());
      case 'Adjective':
        return new PracImp(caseInfo, new AdjClass(), new FormBuilder());
    }
    return new PracImp(caseInfo, {}, new FormBuilder());
  }
}
export class DeHandler implements CaseHandler {
  public canProcess: boolean = false;
  public getCanProcess(tag: lngToken): boolean {
    if (tag === 'de') return this.canProcess;
    return this.canProcess;
  }

  getCase(speechPart: string, caseInfo: WordCase): CaseEdit {
    switch (speechPart) {
      case 'Verb':
        return new PracImp(caseInfo, new GermanClass(), new FormBuilder());
      case 'Noun':
        return new PracImp(caseInfo, new GermanClass(), new FormBuilder());
      case 'Adjective':
        return new PracImp(caseInfo, new GermanClass(), new FormBuilder());
    }
    return new PracImp(caseInfo, {}, new FormBuilder());
  }
}
