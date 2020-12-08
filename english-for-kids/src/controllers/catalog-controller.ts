import CardController from './card-controller';
import CardListComponent from '../components/card-list-component';
import CardsModel from '../models/cards-model';
import { CardType, StatsCardType } from '../types';
import CatalogComponent from '../components/catalog-component';
import PlayButtonComponent from '../components/play-button-component';
import RatingComponent from '../components/rating-component';
import RatingStarComponent from '../components/rating-star-component';
import { render, shuffleArray } from '../utils';
import { GameMode, Sound, StatsField } from '../const';

export default class CatalogController {
  cards: Array<CardController>;
  shuffledCards: Array<CardController>;
  endGameHandler: (errorsCount: number) => void;
  gameCounter: number;
  gameErrors: number;
  isGameOn: boolean;
  ratingComponent: RatingComponent | null;
  catalogComponent: CatalogComponent | null;
  cardListComponent: CardListComponent | null;
  playButtonComponent: PlayButtonComponent | null;

  constructor(
    public container: HTMLElement,
    public cardsModel: CardsModel,
    public mode: GameMode) {

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
    this.trackLearning = this.trackLearning.bind(this);
  }

  render(cards: Array<StatsCardType> | Array<CardType>): void {
    const title: string = cards[0].category;
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

  update(cards: Array<StatsCardType> | Array<CardType>, mode: GameMode): void {
    this.mode = mode;
    const title: string = cards.length !== 0 ? cards[0].category : '';

    this.ratingComponent.clear();
    this.catalogComponent.update(title);
    this.cardListComponent.clear();
    this.playButtonComponent.update(title);
    this.renderCards(cards);
    this.resetGameData();
  }

  renderCards(cards: Array<StatsCardType> | Array<CardType>): void {
    this.cards = [];

    cards.forEach((card) => {
      const cardListElement: HTMLElement = this.cardListComponent.getElement();
      const cardController: CardController = new CardController(cardListElement, this.cardsModel, this.mode);
      this.cards.push(cardController);
      cardController.render(card);
      cardController.setTrainModeClickHandler(this.trackLearning);
    });
  }

  changeMode(mode: GameMode): void {
    this.mode = mode;
    this.playButtonComponent.changeView();
    this.ratingComponent.clear();
    this.cards.forEach((card) => card.changeMode(this.mode));
    this.resetGameData();
  }

  takeGameStep(): void {
    if (!this.isGameOn) {
      this.isGameOn = true;

      this.shuffledCards = shuffleArray(this.cards);
      this.shuffledCards.forEach((card) => card.setGameModeClickHandler(this.checkAnswer));

      const currentCard: CardController = this.shuffledCards[this.gameCounter];
      currentCard.playAudio();
    } else {
      const currentCard: CardController = this.shuffledCards[this.gameCounter];
      currentCard.playAudio();
    }
  }

  checkAnswer(cardName: string): void {
    const currentCardName: string = this.shuffledCards[this.gameCounter].getName();

    if (cardName === currentCardName) {
      const clickedCard: CardController = this.shuffledCards.find((card) => card.getName() === cardName);
      clickedCard.disable();

      new Audio(Sound.RIGHT).play();
      render(this.ratingComponent.getElement(), new RatingStarComponent());
      this.gameCounter += 1;
      this.cardsModel.updateStats(currentCardName, StatsField.CORRECT);

      this.checkGameEnd();
    } else {
      new Audio(Sound.WRONG).play();
      render(this.ratingComponent.getElement(), new RatingStarComponent(false));
      this.gameErrors += 1;
      this.cardsModel.updateStats(currentCardName, StatsField.WRONG);
    }
  }

  trackLearning(cardName: string): void {
    this.cardsModel.updateStats(cardName, StatsField.LEARN);
  }

  checkGameEnd(): void {
    if (this.gameCounter >= this.shuffledCards.length) {
      this.setEndGameHandler();
      this.resetGameData();
    } else {
      setTimeout(this.takeGameStep, 1000);
    }
  }

  setEndGameHandler(): void {
    this.endGameHandler(this.gameErrors);
  }

  addEndGameHandler(handler: (errorsCount: number) => void): void {
    this.endGameHandler = handler;
  }

  resetGameData(): void {
    this.isGameOn = false;
    this.gameCounter = 0;
    this.gameErrors = 0;
  }

  resetStartedGame(): void {
    this.ratingComponent.clear();
    this.playButtonComponent.update();
    this.resetGameData();
  }

  hide(): void {
    this.catalogComponent.hide();
  }

  show(): void {
    this.catalogComponent.show();
  }
}
