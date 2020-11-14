import { DEFAULT_LEVEL, puzzleLevelToPercentCellSize } from './const';
import { render } from './utils';

import PuzzleCellComponent from './components/puzzle-cell';
import PuzzleFieldComponent from './components/puzzle-field';
import PuzzleMenuComponent from './components/puzzle-menu';
import RestartButtonComponent from './components/restart-button';
import SaveButtonComponent from './components/save-button';

export default class PuzzleController {
  constructor(container, puzzleModel) {
    this.container = container;
    this.puzzleModel = puzzleModel;
    this.emptyCell = null;
    this.size = DEFAULT_LEVEL;

    this.makeMove = this.makeMove.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  render() {
    this.container.innerHTML = '';
    this.renderPuzzleField();
    this.renderPuzzleMenu();
  }

  renderPuzzleField() {
    const cellSize = puzzleLevelToPercentCellSize[this.size];
    const puzzleCells = this.puzzleModel.get();
    const puzzleFieldComponent = new PuzzleFieldComponent();

    puzzleCells.forEach((cell) => {
      const puzzleCellComponent = new PuzzleCellComponent(cell, cellSize);
      puzzleCellComponent.setClickHandler(this.makeMove);
      if (cell.value === null) {
        this.emptyCell = puzzleCellComponent;
      }
      render(puzzleFieldComponent.getElement(), puzzleCellComponent);
    });

    render(this.container, puzzleFieldComponent);
  }

  renderPuzzleMenu() {
    const puzzleMenuComponent = new PuzzleMenuComponent();
    const restartButtonComponent = new RestartButtonComponent();
    const saveButtonComponent = new SaveButtonComponent();

    restartButtonComponent.setClickHandler(this.restartGame);
    saveButtonComponent.setClickHandler(this.saveGame);

    render(puzzleMenuComponent.getElement(), restartButtonComponent, saveButtonComponent);
    render(this.container, puzzleMenuComponent);
  }

  makeMove(cell) {
    const { row: emptyCellRow, column: emptyCellColumn } = this.emptyCell.getValue();
    const { row, column } = cell.getValue();

    const rowDiff = Math.abs(emptyCellRow - row);
    const columnDiff = Math.abs(emptyCellColumn - column);

    if (rowDiff + columnDiff > 1 || cell === this.emptyCell) {
      return;
    }

    const swap = { row: emptyCellRow, column: emptyCellColumn };
    this.emptyCell.update({ row, column });
    cell.update(swap);
    this.puzzleModel.update(this.emptyCell.getValue(), cell.getValue());
  }

  saveGame() {
    const cellsState = this.puzzleModel.getCurrentState();
    localStorage.setItem('cells', JSON.stringify(cellsState));
  }

  restartGame() {
    this.puzzleModel.resetCurrentState();
    this.render();
  }
}
