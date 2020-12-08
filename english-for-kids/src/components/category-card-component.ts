import AbstractComponent from './abstract-component';
import { CardType } from '../types';
import { GameMode } from '../const';
import { uppercaseFirstLetter } from '../utils';

const createCategoryCardTemplate = ({ english, russian, image }: CardType, mode: GameMode): string => {
  const englishWord: string = uppercaseFirstLetter(english);
  const russianWord: string = uppercaseFirstLetter(russian);
  const gameModeClass: string = mode === GameMode.PLAY ? ' catalog__item--game' : '';

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
  handler: null | ((cardName: string) => void);

  constructor(
    public item: CardType,
    public mode: GameMode) {

    super();
    this.item = item;
    this.mode = mode;

    this.handler = null;

    this.sayWord = this.sayWord.bind(this);
    this.turnBack = this.turnBack.bind(this);
    this.turnFront = this.turnFront.bind(this);
    this.gameModeClickHandler = this.gameModeClickHandler.bind(this);

    this.setRotateBtnClickHandler();
  }

  getTemplate(): string {
    return createCategoryCardTemplate(this.item, this.mode);
  }

  getCategory(): string {
    return this.item.category;
  }

  setTrainModeClickHandler(handler: (cardName: string) => void): void {
    this.getElement().querySelector('.card__front').addEventListener('click', (evt: Event) => {
      if ((<HTMLElement> evt.target).classList.contains('card__rotate-btn') || this.mode === GameMode.PLAY) {
        return;
      }
      this.sayWord();
      handler(this.item.english);
    });
  }

  setGameModeClickHandler(handler: (cardName: string) => void): void {
    this.handler = handler;
    this.getElement().querySelector('.card__front').addEventListener('click', this.gameModeClickHandler);
  }

  gameModeClickHandler(): void {
    if (this.mode === GameMode.TRAIN) {
      return;
    }
    this.handler(this.item.english);
  }

  setRotateBtnClickHandler(): void {
    this.getElement().querySelector('.card__rotate-btn').addEventListener('click', this.turnBack);
  }

  sayWord(): void {
    const audio = new Audio(this.item.audio);
    audio.play();
  }

  turnBack(): void {
    if (this.mode === GameMode.PLAY) {
      return;
    }
    this.getElement().querySelector('.card').classList.add('card--spin');
    this.getElement().addEventListener('mouseleave', this.turnFront);
  }

  turnFront(): void {
    this.getElement().querySelector('.card').classList.remove('card--spin');
    this.getElement().removeEventListener('mouseleave', this.turnFront);
  }

  changeMode(mode: GameMode): void {
    this.mode = mode;
    this.getElement().classList.toggle('catalog__item--game');
    this.getElement().querySelector('.card').classList.remove('card--bright');
  }

  getName(): string {
    return this.item.english;
  }

  disable(): void {
    this.getElement().querySelector('.card').classList.add('card--bright');
    this.getElement().querySelector('.card__front').removeEventListener('click', this.gameModeClickHandler);
  }
}
