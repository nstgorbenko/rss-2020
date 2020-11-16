import AbstractComponent from './abstract-component';

const createPuzzleMovesTemplate = () => ('<div class="info__moves">Moves: 0</div>');

export default class PuzzleMoves extends AbstractComponent {
  getTemplate() {
    return createPuzzleMovesTemplate();
  }

  update(value) {
    this.getElement().textContent = `Moves: ${value}`;
  }
}
