import AbstractComponent from './abstract-component';

const createStatsContainerTemplate = (): string => ('<div class="stats"></div>');

export default class StatsContainerComponent extends AbstractComponent {
  getTemplate(): string {
    return createStatsContainerTemplate();
  }

  hide(): void {
    this.getElement().classList.add('hide');
  }

  show(): void {
    this.getElement().classList.remove('hide');
  }
}
