import { Inject, Injectable, InjectionToken } from '@angular/core';
import { CaseEdit } from '../../utils/interfaces/CaseEdit';
import { WordCase } from '../../utils/classes/word';
import { FormBuilder } from '@angular/forms';

export const RECEIVED_CASE = new InjectionToken<WordCase>('Received case');
export const BLANK_CASE = new InjectionToken<WordCase>('Blank case');

@Injectable({
  providedIn: 'root',
})
export class PracImp extends CaseEdit {
  constructor(
    @Inject(RECEIVED_CASE) myCase: WordCase,
    @Inject(BLANK_CASE) inj: WordCase,
    fb: FormBuilder
  ) {
    super(myCase, inj, fb);
  }
}
