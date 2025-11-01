import { ImperfClass } from '../classes/Imperf';
import { NounClass } from '../classes/Noun';
import { WordCase } from '../classes/word';

export type NotificationType = 'Verb' | 'Noun';

export class RayFactory {
  static createNotification(type: NotificationType): WordCase {
    switch (type) {
      case 'Verb':
        return new ImperfClass('schlob');
      case 'Noun':
        return new NounClass();

      default:
        return {};
    }
  }
}
