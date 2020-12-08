import AbstractComponent from './abstract-component';
import { CardType } from '../types';
import { GameMode } from '../const';
import { uppercaseFirstLetter } from '../utils';

const createMainCardTemplate = ({ english, image }: CardType, mode: GameMode): string => {
  const englishWord: string = uppercaseFirstLetter(english);
  const gameModeClass: string = mode === GameMode.PLAY ? ' catalog__item--game' : '';

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
  constructor(
    public item: CardType,
    public mode: GameMode) {

    super();
    this.item = item;
    this.mode = mode;
  }

  getTemplate(): string {
    return createMainCardTemplate(this.item, this.mode);
  }

  getCategory(): string {
    return this.item.category;
  }

  setClickHandler(handler: (cardName: string) => void): void {
    this.getElement().querySelector('.card__front').addEventListener('click', () => {
      handler(this.item.english);
    });
  }

  changeMode(): void {
    this.getElement().classList.toggle('catalog__item--game');
  }
}
