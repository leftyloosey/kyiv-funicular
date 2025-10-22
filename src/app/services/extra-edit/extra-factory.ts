import { Injectable } from '@angular/core';
import { ExtraEdit } from '../../utils/interfaces/ExtraEdit';
import { DefinitionEdit } from './definition-edit';
import { ExampleEdit } from './example-edit';

@Injectable({
  providedIn: 'root',
})
export class ExtraFactory {
  fromCode(code: string): ExtraEdit {
    switch (code) {
      case 'examples':
        return new ExampleEdit();
      case 'definitions':
        return new DefinitionEdit();
      default:
        throw new Error('Unknown shit');
    }
  }
}
