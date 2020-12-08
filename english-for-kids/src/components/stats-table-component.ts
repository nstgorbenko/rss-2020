import AbstractComponent from './abstract-component';
import { calculateStatsPercent, getSortedCards, uppercaseFirstLetter } from '../utils';
import { Direction, SortType } from '../const';
import { StatsCardType } from '../types';

const createStatsRowMarkup = (card: StatsCardType): string => {
  const {
    category, english, russian, learn, correct, wrong,
  } = card;
  const categoryName: string = uppercaseFirstLetter(category);
  const correctPercent: number = calculateStatsPercent(card);

  return (
    `<tr>
      <td class="stats__info">
        <img class="stats__title-icon" src="./img/icons/${category}.png" width="20" height="20">
        <span>${categoryName}</span>
      </td>
      <td class="stats__info">${english}</td>
      <td class="stats__info">${russian}</td>
      <td class="stats__info">${learn}</td>
      <td class="stats__info">${correct}</td>
      <td class="stats__info">${wrong}</td>
      <td class="stats__info">${correctPercent}</td>
    </tr>`
  );
};

const createStatsTableTemplate = (): string => (
  `<div class="stats__wrapper">
    <table class="stats__table">
      <thead>
        <tr>
          <th class="stats__title" data-sort-type="category" data-direction="down">Category</th>
          <th class="stats__title" data-sort-type="english">Word</th>
          <th class="stats__title" data-sort-type="russian">Translation</th>
          <th class="stats__title stats__title--learn" data-sort-type="learn">
            <img class="stats__title-icon" src="./img/icons/learn.png" width="20" height="20">
            <span>Learn</span>
          </th>
          <th class="stats__title stats__title--correct" data-sort-type="correct">
            <img class="stats__title-icon" src="./img/icons/correct.png" width="20" height="20">
            <span>Correct</span>
          </th>
          <th class="stats__title stats__title--wrong" data-sort-type="wrong">
            <img class="stats__title-icon" src="./img/icons/wrong.png" width="20" height="20">
            <span>Wrong</span>
          </th>
          <th class="stats__title stats__title--percent" data-sort-type="percent">
            <img class="stats__title-icon" src="./img/icons/percent.png" width="20" height="20">
            <span>Correct %</span>
          </th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>`
);

export default class StatsTableComponent extends AbstractComponent {
  cards: Array<StatsCardType>;
  sortType: SortType;
  direction: Direction;

  constructor() {
    super();
    this.cards = null;
    this.sortType = SortType.CATEGORY;
    this.direction = Direction.DOWN;

    this.setClickHandler();
  }

  getTemplate(): string {
    return createStatsTableTemplate();
  }

  update(cards?: Array<StatsCardType>): void {
    if (cards) {
      this.cards = cards;
    }
    const rowsContainer: HTMLElement = this.getElement().querySelector('tbody');
    rowsContainer.innerHTML = '';

    const sortedCards: Array<StatsCardType> = getSortedCards(this.cards, this.sortType, this.direction);
    const statsRowMarkup: string = sortedCards
      .map((card) => createStatsRowMarkup(card))
      .join('\n');

    rowsContainer.innerHTML = statsRowMarkup;
  }

  setClickHandler(): void {
    this.getElement().querySelector('thead').addEventListener('click', (evt: Event) => {
      const target: HTMLElement = (<HTMLElement> evt.target).closest('.stats__title');
      const { direction, sortType } = target.dataset;

      const previousSortType: HTMLElement = this.getElement().querySelector(`[data-sort-type=${this.sortType}]`);
      previousSortType.dataset.direction = '';

      if (direction === Direction.UP || !direction) {
        target.dataset.direction = Direction.DOWN;
      } else {
        target.dataset.direction = Direction.UP;
      }

      this.sortType = sortType as SortType;
      this.direction = target.dataset.direction as Direction;

      this.update();
    });
  }
}
