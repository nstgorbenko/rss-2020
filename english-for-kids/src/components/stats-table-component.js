import AbstractComponent from './abstract-component';
import { calculateStatsPercent, getSortedCards, uppercaseFirstLetter } from '../utils';
import { Direction, SortType } from '../const';

const createStatsRowMarkup = (card) => {
  const {
    category, english, russian, learn, correct, wrong,
  } = card;
  const categoryName = uppercaseFirstLetter(category);
  const correctPercent = calculateStatsPercent(card);

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

const createStatsTableTemplate = () => (
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
  constructor() {
    super();
    this.cards = null;
    this.sortType = SortType.CATEGORY;
    this.direction = Direction.DOWN;

    this.setClickHandler();
  }

  getTemplate() {
    return createStatsTableTemplate();
  }

  update(cards) {
    if (cards) {
      this.cards = cards;
    }
    const rowsContainer = this.getElement().querySelector('tbody');
    rowsContainer.innerHTML = '';

    const sortedCards = getSortedCards(this.cards, this.sortType, this.direction);
    const statsRowMarkup = sortedCards
      .map((card) => createStatsRowMarkup(card))
      .join('\n');

    rowsContainer.innerHTML = statsRowMarkup;
  }

  setClickHandler() {
    this.getElement().querySelector('thead').addEventListener('click', (evt) => {
      const target = evt.target.closest('.stats__title');
      const { direction, sortType } = target.dataset;

      const previousSortType = this.getElement().querySelector(`[data-sort-type=${this.sortType}]`);
      previousSortType.dataset.direction = '';

      if (direction === Direction.UP || !direction) {
        target.dataset.direction = Direction.DOWN;
      } else {
        target.dataset.direction = Direction.UP;
      }

      this.sortType = sortType;
      this.direction = target.dataset.direction;

      this.update();
    });
  }
}
