import AbstractComponent from './abstract-component';

const createStatsResetTemplate = () => ('<button class="btn btn--stats btn--reset" type="button">Reset statistics</button>');

export default class StatsResetComponent extends AbstractComponent {
  getTemplate() {
    return createStatsResetTemplate();
  }
}
