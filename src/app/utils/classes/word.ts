import { lngToken } from '../tokens/language-token';

export interface WordCase {
  [x: string]: any;
}

export class UnpackCase implements WordCase {
  kase: WordCase;
  constructor(strase: WordCase) {
    this.kase = strase;
  }
}
export class Word {
  public definitions: string[] = [];
  public examples: string[] = [];
  public case: WordCase = {};
  public id: string | undefined;
  public tag: lngToken = 'uk';
  public usersId: string = '';
  constructor(
    public original: string,
    public translation: string,
    public partOfSpeech: string
  ) {}
}
export class WordWithId extends Word {
  public override id: string = '';
}
export interface ReceivedWikiInterface {
  definitions: string[];
  examples: string[];
  partOfSpeech: string;
  tag: lngToken;
}
export interface SendAway {
  id: string;
}
