import AbstractComponent from './abstract-component';
import { formatDuration } from '../utils';

const createPuzzleTimeTemplate = () => ('<div class="stats__time">Time: 00:00:00</div>');

export default class PuzzleTime extends AbstractComponent {
  getTemplate() {
    return createPuzzleTimeTemplate();
  }

  update(startTime) {
    const showTime = () => {
      this.getElement().textContent = `Time: ${formatDuration(startTime)}`;
      setTimeout(showTime, 1000);
    };
    showTime();
  }
}
