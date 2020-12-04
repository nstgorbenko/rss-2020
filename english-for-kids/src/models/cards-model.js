import { MAIN_CATEGORY } from '../const';

export default class CardsModel {
  constructor(cards) {
    this.allCards = [...cards];
    this.stats = [];
    this.category = MAIN_CATEGORY;

    this.categoryChangeHandlers = [];
  }

  get() {
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
  }

  setStats() {
    this.stats = this.allCards
      .filter((card) => card.category !== MAIN_CATEGORY)
      .map(({image, audio, ...rest}) => ({...rest,
        learn: 0,
        correct: 0,
        wrong: 0
      }));
  }

  static callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
