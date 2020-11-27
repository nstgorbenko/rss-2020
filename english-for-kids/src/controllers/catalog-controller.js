import CatalogComponent from '../components/catalog-component';
import CardComponent from '../components/card-component';
import { render } from '../utils';

export default class CatalogController {
  constructor(container) {
    this.container = container;
    this.cards = null;
    this.catalogComponent = null;
  }

  render(cards) {
    this.catalogComponent = new CatalogComponent();
    this.renderCards(cards);
    render(this.container, this.catalogComponent);
  }

  update(cards) {
    this.catalogComponent.clear();
    this.renderCards(cards);
  }

  renderCards(cards) {
    this.cards = cards;
    this.cards.forEach((card) => {
      const cardComponent = new CardComponent(card);
      render(this.catalogComponent.getElement(), cardComponent);
    });
  }
}
