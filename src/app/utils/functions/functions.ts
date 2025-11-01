import { FirstFifty } from '../interfaces/FirstFifty';

export const switchPartSpeech = (translatedWord: string): string => {
  switch (translatedWord) {
    case 'Noun':
      return 'Noun';
      break;
    case 'Adjective':
      return 'Adjective';
      break;
    case 'Verb':
      return 'Verb';
      break;
    default:
      return 'Other';
  }
};

export const getCurrentPage = (word: FirstFifty, value: number): string => {
  const tp = Math.floor(word.totalWords / word.firstQueryResults.length);
  if (value < 0) {
    return tp + (value + 1) + ' / ' + tp;
  } else {
    return value + 1 + ' / ' + tp;
  }
};

export const resetPageLimit = (word: FirstFifty, page: number): boolean => {
  if (word.totalWords + 50 * (page - 1) < 0) return true;
  if (word.firstQueryResults.length < 50) return true;
  return false;
};

export const returnCount = (
  enter: number,
  count: number,
  splength: number
): number => {
  if (count + enter < 0) return (count = splength - 1);
  if (count + enter >= splength) return (count = 0);

  return (count += enter);
};

export const revealModeToggle = (quizMode: boolean) => {
  quizMode = !quizMode;
};
