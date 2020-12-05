import AbstractComponent from './abstract-component';

const createStatsRepeatTemplate = () => ('<button class="btn btn--stats btn--repeat" type="button">Repeat difficult words</button>');

export default class StatsRepeatComponent extends AbstractComponent {
  getTemplate() {
    return createStatsRepeatTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', () => handler('stats'));
  }
}
