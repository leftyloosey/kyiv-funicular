import { WordWithId } from '../classes/word';

export interface FirstFifty {
  firstQueryResults: WordWithId[];
  lastPostInResults: WordWithId;
  myCursor: string;
  totalWords: number;
}
