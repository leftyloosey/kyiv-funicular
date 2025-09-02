export interface WordCase {}

export interface NounCase extends WordCase {
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
export interface WordInterface {
  definitions: string[];
  examples: string[];

  //  original: string,
  //    translation: string,
  partOfSpeech: string;
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
