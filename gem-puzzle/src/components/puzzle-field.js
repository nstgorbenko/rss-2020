import AbstractComponent from './abstract-component';

const createPuzzleFieldTemplate = () => ('<div class="field"></div>');

export default class PuzzleField extends AbstractComponent {
  getTemplate() {
    return createPuzzleFieldTemplate();
  }
}
