import CatalogComponent from '../components/catalog-component';
import CardController from './card-controller';
import CardListComponent from '../components/card-list-component';
import PlayButtonComponent from '../components/play-button-component';
import RatingComponent from '../components/rating-component';
import RatingStarComponent from '../components/rating-star-component';
import { render } from '../utils';
import { Sound } from '../const';

const shuffleArray = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
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

    this.ratingComponent = null;
    this.catalogComponent = null;
    this.cardListComponent = null;
    this.playButtonComponent = null;

    this.playButtonClickHandler = this.playButtonClickHandler.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  render(cards) {
    const title = cards[0].category;
    this.ratingComponent = new RatingComponent();
    this.catalogComponent = new CatalogComponent(title);
    this.cardListComponent = new CardListComponent();
    this.playButtonComponent = new PlayButtonComponent(title);
    this.playButtonComponent.setClickHandler(this.playButtonClickHandler);

    this.renderCards(cards);
    render(this.catalogComponent.getElement(), this.cardListComponent);
    render(this.container, this.ratingComponent);
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
    this.cards.forEach((card) => card.changeMode(this.mode));
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
      const clickedCard = this.shuffledCards.find((card) => card.getName() === cardName);
      clickedCard.disable();

      new Audio(Sound.RIGHT).play();
      render(this.ratingComponent.getElement(), new RatingStarComponent());
    } else {
      new Audio(Sound.WRONG).play();
      render(this.ratingComponent.getElement(), new RatingStarComponent(false));
    }
  }
}
