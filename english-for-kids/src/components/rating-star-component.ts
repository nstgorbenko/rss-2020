import AbstractComponent from './abstract-component';

const createRatingStarTemplate = (isFilled: boolean = true): string => {
  const emptyClass: string = !isFilled ? 'rating__star--error' : '';

  return (
    `<span class="rating__star ${emptyClass}"></span>`
  );
};

export default class RatingStarComponent extends AbstractComponent {
  constructor(
    public isFilled?: boolean) {

    super();
    this.isFilled = isFilled;
  }

  getTemplate(): string {
    return createRatingStarTemplate(this.isFilled);
  }
}
