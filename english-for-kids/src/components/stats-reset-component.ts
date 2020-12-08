import AbstractComponent from './abstract-component';

const createStatsResetTemplate = (): string => ('<button class="btn btn--stats btn--reset" type="button">Reset statistics</button>');

export default class StatsResetComponent extends AbstractComponent {
  getTemplate(): string {
    return createStatsResetTemplate();
  }

  setClickHandler(handler: () => void): void {
    this.getElement().addEventListener('click', handler);
  }
}
