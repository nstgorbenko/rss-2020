import AbstractComponent from './abstract-component';

const createPuzzleInfoTemplate = () => ('<div class="stats"></div>');

export default class PuzzleInfo extends AbstractComponent {
  getTemplate() {
    return createPuzzleInfoTemplate();
  }
}
