import { WordCase } from './word';

export interface GermanCase extends WordCase {
  [x: string]: any;
  line1: string;
  line2: string;
  line3: string;
  line4: string;

  line5: string;
  line6: string;
  line7: string;
  line8: string;
}
export class GermanClass implements GermanCase {
  [x: string]: any;
  line1: string = '';
  line2: string = '';
  line3: string = '';
  line4: string = '';

  line5: string = '';
  line6: string = '';
  line7: string = '';
  line8: string = '';
}
