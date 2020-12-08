import AbstractComponent from './abstract-component';

const createStatsButtonTemplate = (): string => ('<button class="btn btn--stats" type="button">Stats</button>');

export default class StatsButtonComponent extends AbstractComponent {
  getTemplate(): string {
    return createStatsButtonTemplate();
  }

  setClickHandler(handler: () => void): void {
    this.getElement().addEventListener('click', handler);
  }
}
