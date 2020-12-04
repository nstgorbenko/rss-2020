import AbstractComponent from './abstract-component';
import { uppercaseFirstLetter } from '../utils';

const createStatsRowMarkup = ({
  category, english, russian, learn, correct, wrong,
}) => {
  const categoryName = uppercaseFirstLetter(category);
  const correctPercent = Math.trunc(correct / wrong) || 0;

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
          <th class="stats__title stats__title--down">Category</th>
          <th class="stats__title">Word</th>
          <th class="stats__title">Translation</th>
          <th class="stats__title stats__title--learn">
            <img class="stats__title-icon" src="./img/icons/learn.png" width="20" height="20">
            <span>Learn</span>
          </th>
          <th class="stats__title stats__title--correct">
            <img class="stats__title-icon" src="./img/icons/correct.png" width="20" height="20">
            <span>Correct</span>
          </th>
          <th class="stats__title stats__title--wrong">
            <img class="stats__title-icon" src="./img/icons/wrong.png" width="20" height="20">
            <span>Wrong</span>
          </th>
          <th class="stats__title stats__title--percent">
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
  getTemplate() {
    return createStatsTableTemplate();
  }

  update(cards) {
    const rowsContainer = this.getElement().querySelector('tbody');
    rowsContainer.innerHTML = '';
    const statsRowMarkup = cards
      .map((card) => createStatsRowMarkup(card))
      .join('\n');
    rowsContainer.innerHTML = statsRowMarkup;
  }
}
