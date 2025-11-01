export interface Refreshable {
  refreshBuilder(): void;
  partOfSpeechChanged(): void;
}
