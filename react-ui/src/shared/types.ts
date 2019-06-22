export interface Word {
  entries: any[];
  language: string;
  lexicalCategory: string;
  pronunciations: Pronunciation[];
  text: string;
}

export interface Pronunciation {
  dialects: string[];
  audioFile: string;
  phoneticNotation: string;
  phoneticSpelling: string;
}
