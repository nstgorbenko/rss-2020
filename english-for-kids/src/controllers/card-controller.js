import MainCardComponent from '../components/main-card-component';
import CategoryCardComponent from '../components/category-card-component';
import { render } from '../utils';
import { MAIN_CATEGORY } from '../const';

export default class CardController {
  constructor(container, cardsModel, mode) {
    this.container = container;
    this.cardsModel = cardsModel;
    this.mode = mode;

    this.card = null;

    this.setMainCardClickHandler = this.setMainCardClickHandler.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }

  render(card) {
    if (card.category === MAIN_CATEGORY) {
      this.card = new MainCardComponent(card, this.mode);
      this.card.setClickHandler(this.setMainCardClickHandler);
      render(this.container, this.card);
    } else {
      this.card = new CategoryCardComponent(card, this.mode);
      render(this.container, this.card);
    }
  }

  setMainCardClickHandler(newPage) {
    this.cardsModel.setCategory(newPage);
  }

  changeMode(mode) {
    this.mode = mode;
    this.card.changeMode(this.mode);
  }

  playAudio() {
    this.card.sayWord();
  }

  setGameModeClickHandler(handler) {
    this.card.setGameModeClickHandler(handler);
  }

  getName() {
    return this.card.getName();
  }

  disable() {
    this.card.disable();
  }
}
