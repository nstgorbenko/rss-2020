export default class Store {
  constructor(storage) {
    this.storage = storage;
  }

  getStats() {
    return JSON.parse(this.storage.getItem('stats'));
  }

  setStats(stats) {
    this.storage.setItem('stats', JSON.stringify(stats));
  }
}
