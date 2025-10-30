import { WordCase } from './word';
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
export class ImperfClass implements ImperfCase {
  aspect: string = '';
  malePast: string = '';
  femPast: string = '';
  plurPast: string = '';
  firstPresent: string = '';
  InfPresent2nd: string = '';
  FormPresent2nd: string = '';
  present3rd: string = '';
  plurPresent: string = '';
  wePresent: string = '';
  firstFuture: string = '';
  InfFuture2nd: string = '';
  FormFuture2nd: string = '';
  future3rd: string = '';
  plurFuture: string = '';
  weFuture: string = '';
  constructor(aspect: string) {
    this.aspect = aspect;
  }
  [x: string]: any;
}
