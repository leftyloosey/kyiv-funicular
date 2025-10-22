import { ImperfCase } from './word';

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
