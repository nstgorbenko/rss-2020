import CatalogComponent from '../components/catalog-component';
import CardComponent from '../components/card-component';
import CardListComponent from '../components/card-list-component';
import { render } from '../utils';

export default class CatalogController {
  constructor(container) {
    this.container = container;
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
      const cardComponent = new CardComponent(card);
      render(this.cardListComponent.getElement(), cardComponent);
    });
  }
}
