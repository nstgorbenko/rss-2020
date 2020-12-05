import { Category } from '../const';
import { getDifficultWords } from '../utils';

export default class CardsModel {
  constructor(cards, store) {
    this.allCards = [...cards];
    this.store = store;

    this.stats = [];
    this.category = Category.MAIN;

    this.categoryChangeHandlers = [];
  }

  get() {
    if (this.category === Category.STATS) {
      return getDifficultWords(this.stats);
    }
    return this.allCards.filter(({ category }) => category === this.category);
  }

  getCategories() {
    const categoriesSet = this.allCards
      .reduce((categories, card) => categories.add(card.category), new Set());

    return Array.from(categoriesSet);
  }

  setCategory(newCategory) {
    this.category = newCategory;
    CardsModel.callHandlers(this.categoryChangeHandlers);
  }

  addCategoryChangeHandler(handler) {
    this.categoryChangeHandlers.push(handler);
  }

  getStats() {
    if (this.stats.length === 0) {
      this.setStats();
    }
    return this.stats;
  }

  updateStats(cardName, statsName) {
    if (this.stats.length === 0) {
      this.setStats();
    }
    const updatedCard = this.stats.find(({ english }) => english === cardName);
    updatedCard[statsName] += 1;
    this.store.setStats(this.stats);
  }

  setStats() {
    const storeStats = this.store.getStats();
    if (storeStats !== null) {
      this.stats = storeStats;
      return;
    }

    this.resetStats();
  }

  resetStats() {
    this.stats = this.allCards
      .filter((card) => card.category !== Category.MAIN)
      .map((card) => ({...card,
        learn: 0,
        correct: 0,
        wrong: 0,
      }));
    this.store.setStats(this.stats);
  }

  static callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
