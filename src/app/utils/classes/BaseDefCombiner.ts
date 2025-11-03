import { extraDisplayType } from '../constants/factory-types';
import { TranslateDialogData } from '../interfaces/TranslateDialogData';
import { wordDefinitions } from '../interfaces/WordDefinitions';

export class baseDefCombiner {
  type: extraDisplayType;
  newDefArray: wordDefinitions;
  newDefString: TranslateDialogData;
  constructor(
    type: extraDisplayType,
    newDefArray: wordDefinitions,
    newDefString: TranslateDialogData
  ) {
    this.type = type;
    this.newDefArray = newDefArray;
    this.newDefString = newDefString;
  }
  canCombine(): wordDefinitions {
    let can: boolean = false;
    if (this.type === this.newDefString.type) can = true;

    return this.combine();
  }

  combine(): wordDefinitions {
    let buildingArray = { [this.type]: [this.newDefString.definition] };
    const returnDefArray = buildingArray as wordDefinitions;

    if (this.newDefArray[this.type]) {
      returnDefArray[this.type]?.pop();

      if (this.newDefArray[this.type])
        this.newDefArray[this.type]?.forEach((def) => {
          returnDefArray[this.type]?.push(def);
        });

      returnDefArray[this.type]?.splice(
        this.newDefString.index,
        0,
        this.newDefString.definition
      );
    }
    return returnDefArray;
  }
}
