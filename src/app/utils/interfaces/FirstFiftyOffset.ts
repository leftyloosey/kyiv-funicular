import { WordWithId } from '../classes/word';

export interface FirstFiftyOffset {
  firstQueryResults: WordWithId[];
  page: number;
  totalWords: number;
}
