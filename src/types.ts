export type VowelCategory = 'kuril' | 'nedil' | 'aayutham';
export type ConsonantCategory = 'vallinam' | 'mellinam' | 'idaiyinam';

export interface Letter {
  id: string;
  tamil: string;
  english: string;
  exampleTamil: string;
  exampleEnglish: string;
  translation: string;
  emoji: string;
  type: 'vowel' | 'consonant';
  category?: VowelCategory | ConsonantCategory;
  categoryLabel?: string;
}

export interface Phrase {
  id: string;
  tamil: string;
  english: string;
  translation: string;
  emoji: string;
  category?: string;
  contextNote?: string;
}

export interface CategoryItem {
  id: string;
  tamil: string;
  english: string;
  translation: string;
  emoji: string;
  color?: string;
  numberVal?: number;
  tamilNumeral?: string;
  grammaticalType?: string;
}

export interface Combination {
  consonant: string;
  consonantEng: string;
  vowel: string;
  vowelEng: string;
  combined: string;
  combinedEng: string;
  example: string;
  exampleEng: string;
  meaning: string;
  emoji: string;
}
