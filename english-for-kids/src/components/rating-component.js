import AbstractComponent from './abstract-component';

const createRatingTemplate = () => ('<div class="rating"></div>');

export default class RatingComponent extends AbstractComponent {
  getTemplate() {
    return createRatingTemplate();
  }
}
