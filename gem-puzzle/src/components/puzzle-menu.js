import AbstractComponent from './abstract-component';

const createPuzzleMenuTemplate = () => ('<div class="menu"></div>');

export default class PuzzleMenu extends AbstractComponent {
  getTemplate() {
    return createPuzzleMenuTemplate();
  }
}
