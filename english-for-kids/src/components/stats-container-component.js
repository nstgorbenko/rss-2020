import AbstractComponent from './abstract-component';

const createStatsContainerTemplate = () => ('<div class="stats"></div>');

export default class StatsContainerComponent extends AbstractComponent {
  getTemplate() {
    return createStatsContainerTemplate();
  }

  hide() {
    this.getElement().classList.add('hide');
  }

  show() {
    this.getElement().classList.remove('hide');
  }
}
