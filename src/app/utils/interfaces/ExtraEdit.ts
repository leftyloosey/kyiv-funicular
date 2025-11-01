import { wordDefinitions } from './WordDefinitions';

export interface ExtraEdit {
  toEdit: (array: string[]) => wordDefinitions;
}
