import AbstractComponent from './abstract-component';
import { uppercaseFirstLetter } from '../utils';
import { GameMode } from '../const';

const createMainCardTemplate = ({ english, image }, mode) => {
  const englishWord = uppercaseFirstLetter(english);
  const gameModeClass = mode === GameMode.PLAY ? ' catalog__item--game' : '';

  return (
    `<li class="catalog__item${gameModeClass}">
      <div class="card">
        <div class="card__front">
          <img class="card__image" src=${image} alt=${english} width="250" height="250">
          <p class="card__name"><span>${englishWord}</span></p>
        </div>
      </div>
    </li>`
  );
};

export default class MainCardComponent extends AbstractComponent {
  constructor(cardInfo, mode) {
    super();

    this.item = cardInfo;
    this.mode = mode;
  }

  getTemplate() {
    return createMainCardTemplate(this.item, this.mode);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', () => {
      handler(this.item.english);
    });
  }

  changeMode() {
    this.getElement().classList.toggle('catalog__item--game');
  }
}
