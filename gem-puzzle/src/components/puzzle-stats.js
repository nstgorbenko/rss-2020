import AbstractComponent from './abstract-component';

const createPuzzleStatsTemplate = () => ('<div class="stats"></div>');

export default class PuzzleMenu extends AbstractComponent {
  getTemplate() {
    return createPuzzleStatsTemplate();
  }
}
