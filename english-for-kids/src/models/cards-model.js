import { MAIN_CATEGORY } from '../const';

export default class CardsModel {
  constructor(cards) {
    this.allCards = cards;
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

  static callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
