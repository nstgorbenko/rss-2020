import MainCardComponent from '../components/main-card-component';
import CategoryCardComponent from '../components/category-card-component';
import { render } from '../utils';
import { MAIN_CATEGORY } from '../const';

export default class CardController {
  constructor(container, cardsModel) {
    this.container = container;
    this.cardsModel = cardsModel;

    this.setMainCardClickHandler = this.setMainCardClickHandler.bind(this);
  }

  render(card) {
    if (card.category === MAIN_CATEGORY) {
      const mainCardComponent = new MainCardComponent(card);

      mainCardComponent.setClickHandler(this.setMainCardClickHandler);

      render(this.container, mainCardComponent);
    } else {
      const categoryCardComponent = new CategoryCardComponent(card);
      render(this.container, categoryCardComponent);
    }
  }

  setMainCardClickHandler(newPage) {
    this.cardsModel.setCategory(newPage);
  }
}
