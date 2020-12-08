import AbstractComponent from './abstract-component';

const createRatingTemplate = (): string => ('<div class="rating"></div>');

export default class RatingComponent extends AbstractComponent {
  getTemplate(): string {
    return createRatingTemplate();
  }

  clear(): void {
    this.getElement().innerHTML = '';
  }
}
