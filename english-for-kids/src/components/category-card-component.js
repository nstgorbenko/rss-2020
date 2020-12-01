import AbstractComponent from './abstract-component';
import { uppercaseFirstLetter } from '../utils';

const createCategoryCardTemplate = ({ english, russian, image }) => {
  const englishWord = uppercaseFirstLetter(english);
  const russianWord = uppercaseFirstLetter(russian);

  return (
    `<li class="catalog__item">
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
  constructor(cardInfo) {
    super();

    this.item = cardInfo;

    this.sayWord = this.sayWord.bind(this);
    this.turnBack = this.turnBack.bind(this);
    this.turnFront = this.turnFront.bind(this);

    this.setCardClickHandler();
    this.setRotateBtnClickHandler();
  }

  getTemplate() {
    return createCategoryCardTemplate(this.item);
  }

  setCardClickHandler() {
    this.getElement().querySelector('.card__front').addEventListener('click', this.sayWord);
  }

  setRotateBtnClickHandler() {
    this.getElement().querySelector('.card__rotate-btn').addEventListener('click', this.turnBack);
  }

  sayWord(evt) {
    if (evt.target.classList.contains('card__rotate-btn')) {
      return;
    }
    const audio = new Audio(this.item.audio);
    audio.play();
  }

  turnBack() {
    this.getElement().querySelector('.card').classList.add('card--spin');
    this.getElement().addEventListener('mouseleave', this.turnFront);
  }

  turnFront() {
    this.getElement().querySelector('.card').classList.remove('card--spin');
    this.getElement().removeEventListener('mouseleave', this.turnFront);
  }
}
