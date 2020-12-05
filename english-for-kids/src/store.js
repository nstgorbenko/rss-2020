import { Category } from './const';

export default class Store {
  constructor(storage) {
    this.storage = storage;
  }

  getStats() {
    return JSON.parse(this.storage.getItem(Category.STATS));
  }

  setStats(stats) {
    this.storage.setItem(Category.STATS, JSON.stringify(stats));
  }
}
