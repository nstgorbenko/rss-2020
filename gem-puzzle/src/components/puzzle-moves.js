import AbstractComponent from './abstract-component';

const createPuzzleMovesTemplate = () => ('<div class="stats__moves">Moves: 0</div>');

export default class PuzzleMenu extends AbstractComponent {
  getTemplate() {
    return createPuzzleMovesTemplate();
  }

  update(value) {
    this.getElement().textContent = value;
  }
}
