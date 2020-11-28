import AbstractComponent from './abstract-component';
import { uppercaseFirstLetter } from '../utils';

const createMainCardTemplate = ({ english, image }) => {
  const englishWord = uppercaseFirstLetter(english);

  return (
    `<li class="catalog__item">
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
  constructor(cardInfo) {
    super();

    this.item = cardInfo;
  }

  getTemplate() {
    return createMainCardTemplate(this.item);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', () => {
      handler(this.item.english);
    });
  }
}
