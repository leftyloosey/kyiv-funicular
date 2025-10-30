import { WordCase } from './word';

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
export class AdjClass implements AdjCase {
  [x: string]: any;
  malNom: string = '';
  malAcc: string = '';
  malGen: string = '';
  malDat: string = '';
  malIns: string = '';
  malLoc: string = '';
  malVoc: string = '';
  femNom: string = '';
  femAcc: string = '';
  femGen: string = '';
  femDat: string = '';
  femIns: string = '';
  femLoc: string = '';
  femVoc: string = '';
  neuNom: string = '';
  neuAcc: string = '';
  neuGen: string = '';
  neuDat: string = '';
  neuIns: string = '';
  neuLoc: string = '';
  neuVoc: string = '';
  plurNom: string = '';
  plurAcc: string = '';
  plurGen: string = '';
  plurDat: string = '';
  plurIns: string = '';
  plurLoc: string = '';
  plurVoc: string = '';
}
