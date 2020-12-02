import AbstractComponent from './abstract-component';

const createRatingStarTemplate = (isFilled = true) => {
  const emptyClass = !isFilled ? 'rating__star--error' : '';

  return (
    `<span class="rating__star ${emptyClass}"></span>`
  );
};

export default class RatingStarComponent extends AbstractComponent {
  constructor(isFilled) {
    super();
    this.isFilled = isFilled;
  }

  getTemplate() {
    return createRatingStarTemplate(this.isFilled);
  }
}
