import AbstractComponent from './abstract-component';

const createStatsButtonTemplate = () => ('<button class="btn btn--stats" type="button">Stats</button>');

export default class StatsButtonComponent extends AbstractComponent {
  getTemplate() {
    return createStatsButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', handler);
  }
}
