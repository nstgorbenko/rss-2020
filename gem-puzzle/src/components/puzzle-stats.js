import AbstractComponent from './abstract-component';

const createPuzzleStatsTemplate = ({ moves, time, level }) => {
  return (
    `<div class="stats__row">
      <div class="stats__cell">${moves}</div>
      <div class="stats__cell">${time}</div>
      <div class="stats__cell">${level} * ${level}</div>
    </div>`
  );
};

export default class PuzzleStats extends AbstractComponent {
  constructor({ moves, time, level }) {
    super();

    this.moves = moves;
    this.time = time;
    this.level = level;
  }

  getTemplate() {
    return createPuzzleStatsTemplate({ moves: this.moves, time: this.time, level: this.level });
  }
}
