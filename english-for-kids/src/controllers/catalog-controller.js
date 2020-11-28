import CatalogComponent from '../components/catalog-component';
import CardController from './card-controller';
import CardListComponent from '../components/card-list-component';
import { render } from '../utils';

export default class CatalogController {
  constructor(container, cardsModel) {
    this.container = container;
    this.cardsModel = cardsModel;

    this.catalogComponent = null;
    this.cardListComponent = null;
  }

  render(cards) {
    const title = cards[0].category;
    this.catalogComponent = new CatalogComponent(title);
    this.cardListComponent = new CardListComponent();

    this.renderCards(cards);
    render(this.catalogComponent.getElement(), this.cardListComponent);
    render(this.container, this.catalogComponent);
  }

  update(cards) {
    const title = cards[0].category;

    this.catalogComponent.update(title);
    this.cardListComponent.clear();
    this.renderCards(cards);
  }

  renderCards(cards) {
    cards.forEach((card) => {
      const cardListElement = this.cardListComponent.getElement();
      const cardController = new CardController(cardListElement, this.cardsModel);
      cardController.render(card);
    });
  }
}
