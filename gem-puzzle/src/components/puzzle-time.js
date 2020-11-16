import AbstractComponent from './abstract-component';
import { formatDuration } from '../utils';

const createPuzzleTimeTemplate = () => ('<div class="stats__time">Time: 00:00:00</div>');

export default class PuzzleTime extends AbstractComponent {
  constructor() {
    super();
    this.timer = null;
    this.duration = null;
  }

  getTemplate() {
    return createPuzzleTimeTemplate();
  }

  update(startTime) {
    const showTime = () => {
      this.duration = formatDuration(startTime);
      this.getElement().textContent = `Time: ${this.duration}`;
      this.timer = setTimeout(showTime, 1000);
    };
    showTime();
  }

  getTime() {
    clearTimeout(this.timer);
    return this.duration;
  }
}
