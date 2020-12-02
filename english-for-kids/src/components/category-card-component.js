import AbstractComponent from './abstract-component';
import { uppercaseFirstLetter } from '../utils';
import { GameMode } from '../const';

const createCategoryCardTemplate = ({ english, russian, image }, mode) => {
  const englishWord = uppercaseFirstLetter(english);
  const russianWord = uppercaseFirstLetter(russian);
  const gameModeClass = mode === GameMode.PLAY ? ' catalog__item--game' : '';

  return (
    `<li class="catalog__item${gameModeClass}">
      <div class="card card--rotating">
        <div class="card__front">
          <span class="card__rotate-btn"></span>
          <img class="card__image" src=${image} alt=${english} width="250" height="250">
          <p class="card__name"><span>${englishWord}</span></p>
        </div>
        <div class="card__back">
          <img class="card__image" src=${image} alt=${russian} width="250" height="250">
          <p class="card__name"><span>${russianWord}</span></p>
        </div>
      </div>
    </li>`
  );
};

export default class CategoryCardComponent extends AbstractComponent {
  constructor(cardInfo, mode) {
    super();

    this.item = cardInfo;
    this.mode = mode;

    this.handler = null;

    this.sayWord = this.sayWord.bind(this);
    this.turnBack = this.turnBack.bind(this);
    this.turnFront = this.turnFront.bind(this);
    this.gameModeClickHandler = this.gameModeClickHandler.bind(this);

    this.setTrainModeClickHandler();
    this.setRotateBtnClickHandler();
  }

  getTemplate() {
    return createCategoryCardTemplate(this.item, this.mode);
  }

  setTrainModeClickHandler() {
    this.getElement().querySelector('.card__front').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('card__rotate-btn') || this.mode === GameMode.PLAY) {
        return;
      }
      this.sayWord();
    });
  }

  setGameModeClickHandler(handler) {
    this.handler = handler;
    this.getElement().querySelector('.card__front').addEventListener('click', this.gameModeClickHandler);
  }

  gameModeClickHandler() {
    if (this.mode === GameMode.TRAIN) {
      return;
    }
    this.handler(this.item.english);
  }

  setRotateBtnClickHandler() {
    this.getElement().querySelector('.card__rotate-btn').addEventListener('click', this.turnBack);
  }

  sayWord() {
    const audio = new Audio(this.item.audio);
    audio.play();
  }

  turnBack() {
    if (this.mode === GameMode.PLAY) {
      return;
    }
    this.getElement().querySelector('.card').classList.add('card--spin');
    this.getElement().addEventListener('mouseleave', this.turnFront);
  }

  turnFront() {
    this.getElement().querySelector('.card').classList.remove('card--spin');
    this.getElement().removeEventListener('mouseleave', this.turnFront);
  }

  changeMode(mode) {
    this.mode = mode;
    this.getElement().classList.toggle('catalog__item--game');
  }

  getName() {
    return this.item.english;
  }

  disable() {
    this.getElement().querySelector('.card').classList.add('card--bright');
    this.getElement().querySelector('.card__front').removeEventListener('click', this.gameModeClickHandler);
  }
}
