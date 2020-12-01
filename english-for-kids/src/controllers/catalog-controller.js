import CatalogComponent from '../components/catalog-component';
import CardController from './card-controller';
import CardListComponent from '../components/card-list-component';
import PlayButtonComponent from '../components/play-button-component';
import { render } from '../utils';

export default class CatalogController {
  constructor(container, cardsModel, mode) {
    this.container = container;
    this.cardsModel = cardsModel;
    this.mode = mode;

    this.cards = [];

    this.catalogComponent = null;
    this.cardListComponent = null;
    this.playButtonComponent = null;
  }

  render(cards) {
    const title = cards[0].category;
    this.catalogComponent = new CatalogComponent(title);
    this.cardListComponent = new CardListComponent();
    this.playButtonComponent = new PlayButtonComponent(title);

    this.renderCards(cards);
    render(this.catalogComponent.getElement(), this.cardListComponent);
    render(this.container, this.catalogComponent);
    render(this.container, this.playButtonComponent);
  }

  update(cards, mode) {
    this.mode = mode;
    const title = cards[0].category;

    this.catalogComponent.update(title);
    this.playButtonComponent.update(title);
    this.cardListComponent.clear();
    this.renderCards(cards);
  }

  renderCards(cards) {
    this.cards = [];

    cards.forEach((card) => {
      const cardListElement = this.cardListComponent.getElement();
      const cardController = new CardController(cardListElement, this.cardsModel, this.mode);
      this.cards.push(cardController);
      cardController.render(card);
    });
  }

  changeMode(mode) {
    this.mode = mode;
    this.playButtonComponent.changeView();
    this.cards.forEach(card => card.changeMode(this.mode));
  }
}
