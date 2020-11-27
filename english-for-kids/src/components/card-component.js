import AbstractComponent from './abstract-component';
import { uppercaseFirstLetter } from '../utils';
import { MAIN_CATEGORY } from '../const';

const createCardTemplate = ({
  category, english, russian, image,
}) => {
  const isRotatingCard = category !== MAIN_CATEGORY;
  const rotatingCardClass = isRotatingCard ? ' card--rotating' : '';
  const englishWord = uppercaseFirstLetter(english);
  const russianWord = uppercaseFirstLetter(russian);

  return (
    `<li class="catalog__item">
      <div class="card${rotatingCardClass}">
        <div class="card__front">
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

export default class CardComponent extends AbstractComponent {
  constructor(cardInfo) {
    super();

    this.item = cardInfo;
  }

  getTemplate() {
    return createCardTemplate(this.item);
  }
}
