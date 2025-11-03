import { lngToken } from '../tokens/language-token';

export interface TranslateSubmit {
  text: string;
  tag: lngToken;
  target: lngToken;
}
