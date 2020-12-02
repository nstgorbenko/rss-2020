import CardController from './card-controller';
import CardListComponent from '../components/card-list-component';
import CatalogComponent from '../components/catalog-component';
import PlayButtonComponent from '../components/play-button-component';
import RatingComponent from '../components/rating-component';
import RatingStarComponent from '../components/rating-star-component';
import { render, shuffleArray } from '../utils';
import { Sound } from '../const';

export default class CatalogController {
  constructor(container, cardsModel, mode) {
    this.container = container;
    this.cardsModel = cardsModel;
    this.mode = mode;

    this.cards = [];
    this.shuffledCards = [];
    this.endGameHandler = null;
    this.gameCounter = 0;
    this.gameErrors = 0;
    this.isGameOn = false;

    this.ratingComponent = null;
    this.catalogComponent = null;
    this.cardListComponent = null;
    this.playButtonComponent = null;

    this.takeGameStep = this.takeGameStep.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  render(cards) {
    const title = cards[0].category;
    this.ratingComponent = new RatingComponent();
    this.catalogComponent = new CatalogComponent(title);
    this.cardListComponent = new CardListComponent();
    this.playButtonComponent = new PlayButtonComponent(title);
    this.playButtonComponent.setClickHandler(this.takeGameStep);

    this.renderCards(cards);
    render(this.catalogComponent.getElement(), this.cardListComponent);
    render(this.container, this.ratingComponent);
    render(this.container, this.catalogComponent);
    render(this.container, this.playButtonComponent);
  }

  update(cards, mode) {
    this.mode = mode;
    const title = cards[0].category;

    this.ratingComponent.clear();
    this.catalogComponent.update(title);
    this.cardListComponent.clear();
    this.playButtonComponent.update(title);
    this.renderCards(cards);
    this.resetGameData();
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
    this.cards.forEach((card) => card.changeMode(this.mode));
  }

  takeGameStep() {
    if (!this.isGameOn) {
      this.isGameOn = true;

      this.shuffledCards = shuffleArray(this.cards);
      this.shuffledCards.forEach((card) => card.setGameModeClickHandler(this.checkAnswer));

      const currentCard = this.shuffledCards[this.gameCounter];
      currentCard.playAudio();
    } else {
      const currentCard = this.shuffledCards[this.gameCounter];
      currentCard.playAudio();
    }
  }

  checkAnswer(cardName) {
    const currentCard = this.shuffledCards[this.gameCounter];

    if (cardName === currentCard.getName()) {
      const clickedCard = this.shuffledCards.find((card) => card.getName() === cardName);
      clickedCard.disable();

      new Audio(Sound.RIGHT).play();
      render(this.ratingComponent.getElement(), new RatingStarComponent());
      this.gameCounter += 1;

      this.checkGameEnd();
    } else {
      new Audio(Sound.WRONG).play();
      render(this.ratingComponent.getElement(), new RatingStarComponent(false));
      this.gameErrors += 1;
    }
  }

  checkGameEnd() {
    if (this.gameCounter >= this.shuffledCards.length) {
      this.setEndGameHandler();
      this.resetGameData();
    } else {
      setTimeout(this.takeGameStep, 1000);
    }
  }

  setEndGameHandler() {
    this.endGameHandler(this.gameErrors);
  }

  addEndGameHandler(handler) {
    this.endGameHandler = handler;
  }

  resetGameData() {
    this.isGameOn = false;
    this.gameCounter = 0;
    this.gameErrors = 0;
  }
}
