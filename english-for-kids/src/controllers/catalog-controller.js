import CatalogComponent from '../components/catalog-component';
import CardController from './card-controller';
import CardListComponent from '../components/card-list-component';
import PlayButtonComponent from '../components/play-button-component';
import { render } from '../utils';
import { Sound } from '../const';

const shuffleArray = ([...array]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export default class CatalogController {
  constructor(container, cardsModel, mode) {
    this.container = container;
    this.cardsModel = cardsModel;
    this.mode = mode;

    this.cards = [];
    this.shuffledCards = [];
    this.gameCounter = 0;
    this.currentCard = null;
    this.isStartGame = false;

    this.catalogComponent = null;
    this.cardListComponent = null;
    this.playButtonComponent = null;

    this.playButtonClickHandler = this.playButtonClickHandler.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  render(cards) {
    const title = cards[0].category;
    this.catalogComponent = new CatalogComponent(title);
    this.cardListComponent = new CardListComponent();
    this.playButtonComponent = new PlayButtonComponent(title);
    this.playButtonComponent.setClickHandler(this.playButtonClickHandler);

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

  playButtonClickHandler() {
    if (!this.isStartGame) {
      this.shuffledCards = shuffleArray(this.cards);
      this.currentCard = this.shuffledCards[this.gameCounter];

      this.shuffledCards.forEach((card) => card.setGameModeClickHandler(this.checkAnswer));

      this.currentCard.playAudio();
      this.isStartGame = true;
    } else {
      this.currentCard.playAudio();
    }
  }

  checkAnswer(cardName) {
    if (cardName === this.currentCard.getName()) {
      new Audio(Sound.RIGHT).play();
    } else {
      new Audio(Sound.WRONG).play();
    }
  }
}
