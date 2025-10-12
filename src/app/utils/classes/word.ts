export interface WordCase {}

export class UnpackCase implements WordCase {
  kase: WordCase;
  constructor(strase: WordCase) {
    this.kase = strase;
  }
}
export interface NounCase extends WordCase {
  [x: string]: any;
  singNom: string;
  singAcc: string;
  singGen: string;
  singDat: string;
  singIns: string;
  singLoc: string;
  singVoc: string;

  plurNom: string;
  plurAcc: string;
  plurGen: string;
  plurDat: string;
  plurIns: string;
  plurLoc: string;
  plurVoc: string;
}
export interface AdjCase extends WordCase {
  [x: string]: any;
  malNom: string;
  malAcc: string;
  malGen: string;
  malDat: string;
  malIns: string;
  malLoc: string;
  malVoc: string;

  femNom: string;
  femAcc: string;
  femGen: string;
  femDat: string;
  femIns: string;
  femLoc: string;
  femVoc: string;

  neuNom: string;
  neuAcc: string;
  neuGen: string;
  neuDat: string;
  neuIns: string;
  neuLoc: string;
  neuVoc: string;

  plurNom: string;
  plurAcc: string;
  plurGen: string;
  plurDat: string;
  plurIns: string;
  plurLoc: string;
  plurVoc: string;
}
export interface PerfectCase extends WordCase {
  malePast: String;
  femPast: String;
  plurPast: String;

  future1st: String;
  InfFuture2nd: String;
  FormFuture2nd: String;
  future3rd: String;
  futurePlur: String;
  futureWe: String;
}
export interface ImperfCase extends WordCase {
  [x: string]: any;
  aspect: String;
  malePast: String;
  femPast: String;
  plurPast: String;

  firstPresent: String;
  InfPresent2nd: String;
  FormPresent2nd: String;
  present3rd: String;
  plurPresent: String;
  wePresent: String;

  firstFuture: String;
  InfFuture2nd: String;
  FormFuture2nd: String;
  future3rd: String;
  plurFuture: String;
  weFuture: String;
}

export class Word {
  public definitions: string[] = [];
  public examples: string[] = [];
  public case: WordCase = {};
  constructor(
    public original: string,
    public translation: string,
    public partOfSpeech: string
  ) {}
}
export class WordWithId extends Word {
  public id: string = '';
}
export interface WordInterface {
  definitions: string[];
  examples: string[];
  partOfSpeech: string;
}
export interface FirstFiftyOffset {
  firstQueryResults: WordWithId[];
  page: number;
  totalWords: number;
}
export interface FirstFifty {
  firstQueryResults: WordWithId[];
  lastPostInResults: WordWithId;
  myCursor: string;
  totalWords: number;
}

export interface SendAway {
  id: string;
}
export class Noun extends Word {
  public singNom = '';
  public singAcc = '';
  public singGen = '';
  public singDat = '';
  public singIns = '';
  public singLoc = '';
  public singVoc = '';

  public plurNom = '';
  public plurAcc = '';
  public plurGen = '';
  public plurDat = '';
  public plurIns = '';
  public plurLoc = '';
  public plurVoc = '';
}
export interface CaseDisplay {
  tense: string;
  value: string;
}

export interface Quizzable {
  toggleHideLevel(): void;
  moodToggle(): void;
}
