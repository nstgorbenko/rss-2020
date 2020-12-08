import AbstractComponent from './abstract-component';

const createStatsRepeatTemplate = (): string => ('<button class="btn btn--stats btn--repeat" type="button">Repeat difficult words</button>');

export default class StatsRepeatComponent extends AbstractComponent {
  getTemplate(): string {
    return createStatsRepeatTemplate();
  }

  setClickHandler(handler: (newPage: string) => void): void {
    this.getElement().addEventListener('click', () => handler('stats'));
  }
}
