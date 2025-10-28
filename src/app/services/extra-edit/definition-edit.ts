import { inject, Injectable } from '@angular/core';
import { ExtraEdit } from '../../utils/interfaces/ExtraEdit';
import { FormGroup } from '@angular/forms';
import { WordWithId } from '../../utils/classes/word';
import { wordDefinitions } from '../../utils/interfaces/WordDefinitions';
import { map, Observable } from 'rxjs';
import { WordBuilderService } from '../delivery-services/word-builder-service/word-builder-service';

@Injectable({
  providedIn: 'root',
})
export class DefinitionEdit implements ExtraEdit {
  // builder = inject(WordBuilderService);

  toEdit(workArray: string[]) {
    const submitExmp: wordDefinitions = {};
    // const submitExmp: wordDefinitions = { definitions: workArray };

    return submitExmp;
  }
}
