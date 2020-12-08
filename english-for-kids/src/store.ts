import { Category } from './const';
import { StatsCardType } from './types';

export default class Store {
  constructor(
    public storage: any) {
    this.storage = storage;
  }

  getStats(): Array<StatsCardType> {
    return JSON.parse(this.storage.getItem(Category.STATS));
  }

  setStats(stats: Array<StatsCardType>): void {
    this.storage.setItem(Category.STATS, JSON.stringify(stats));
  }
}
