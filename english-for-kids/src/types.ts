export interface CardType {
  category: string;
  english: string;
  russian: string;
  image: string;
  audio: string;
}

export interface StatsCardType extends CardType {
  learn: number;
  correct: number;
  wrong: number;
}
