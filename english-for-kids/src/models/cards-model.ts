import { CardType, StatsCardType } from '../types';
import { Category } from '../const';
import { getDifficultWords } from '../utils';
import Store from '../store';

export default class CardsModel {
  stats: Array<StatsCardType>;
  category: string;
  categoryChangeHandlers: Array<() => void>;

  constructor(
    public allCards: Array<CardType>,
    public store: Store) {
    this.allCards = [...allCards];
    this.store = store;

    this.stats = [];
    this.category = Category.MAIN;

    this.categoryChangeHandlers = [];
  }

  get(): Array<StatsCardType> | Array<CardType> {
    if (this.category === Category.STATS) {
      return getDifficultWords(this.stats);
    }
    return this.allCards.filter(({ category }) => category === this.category);
  }

  getCategories(): Array<string> {
    const categoriesSet = this.allCards
      .reduce((categories, card) => categories.add(card.category), new Set()) as Set<string>;

    return Array.from(categoriesSet);
  }

  setCategory(newCategory: string): void {
    this.category = newCategory;
    CardsModel.callHandlers(this.categoryChangeHandlers);
  }

  addCategoryChangeHandler(handler: () => void): void {
    this.categoryChangeHandlers.push(handler);
  }

  getStats(): Array<StatsCardType> {
    if (this.stats.length === 0) {
      this.setStats();
    }
    return this.stats;
  }

  updateStats(cardName: string, statsName: string): void {
    if (this.stats.length === 0) {
      this.setStats();
    }
    const updatedCard: StatsCardType = this.stats.find(({ english }) => english === cardName);
    updatedCard[statsName] += 1;
    this.store.setStats(this.stats);
  }

  setStats(): void {
    const storeStats: Array<StatsCardType> | null = this.store.getStats();
    if (storeStats !== null) {
      this.stats = storeStats;
      return;
    }

    this.resetStats();
  }

  resetStats(): void {
    this.stats = this.allCards
      .filter((card) => card.category !== Category.MAIN)
      .map((card) => ({...card,
        learn: 0,
        correct: 0,
        wrong: 0,
      }));
    this.store.setStats(this.stats);
  }

  static callHandlers(handlers: Array<() => void>): void {
    handlers.forEach((handler) => handler());
  }
}
