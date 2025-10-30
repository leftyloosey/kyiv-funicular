import { WordCase } from './word';

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
export class NounClass implements NounCase {
  singNom: string = '';
  singAcc: string = '';
  singGen: string = '';
  singDat: string = '';
  singIns: string = '';
  singLoc: string = '';
  singVoc: string = '';
  plurNom: string = '';
  plurAcc: string = '';
  plurGen: string = '';
  plurDat: string = '';
  plurIns: string = '';
  plurLoc: string = '';
  plurVoc: string = '';

  [x: string]: any;
}
