import CardsModel from '../models/cards-model';
import { CardType, StatsCardType } from '../types';
import { Category, GameMode } from '../const';
import CategoryCardComponent from '../components/category-card-component';
import MainCardComponent from '../components/main-card-component';
import { render } from '../utils';

export default class CardController {
  card: MainCardComponent | CategoryCardComponent;

  constructor(
    public container: HTMLElement,
    public cardsModel: CardsModel,
    public mode: GameMode) {

    this.container = container;
    this.cardsModel = cardsModel;
    this.mode = mode;

    this.card = null;

    this.setMainCardClickHandler = this.setMainCardClickHandler.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  render(card: CardType | StatsCardType): void {
    if (card.category === Category.MAIN) {
      this.card = new MainCardComponent(card, this.mode);
      this.card.setClickHandler(this.setMainCardClickHandler);
      render(this.container, this.card);
    } else {
      this.card = new CategoryCardComponent(card, this.mode);
      render(this.container, this.card);
    }
  }

  setMainCardClickHandler(newPage: string): void {
    this.cardsModel.setCategory(newPage);
  }

  changeMode(mode: GameMode): void {
    this.mode = mode;
    this.card.changeMode(this.mode);
  }

  playAudio(): void {
    (<CategoryCardComponent> this.card).sayWord();
  }

  setGameModeClickHandler(handler: (cardName: string) => void): void {
    (<CategoryCardComponent> this.card).setGameModeClickHandler(handler);
  }

  setTrainModeClickHandler(handler: (cardName: string) => void): void {
    if (this.card.getCategory() !== Category.MAIN) {
      (<CategoryCardComponent> this.card).setTrainModeClickHandler(handler);
    }
  }

  getName(): string {
    return (<CategoryCardComponent> this.card).getName();
  }

  disable(): void {
    (<CategoryCardComponent> this.card).disable();
  }
}
