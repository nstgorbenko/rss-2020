import { DEFAULT_LEVEL, puzzleLevelToPercentCellSize } from './const';
import { render } from './utils';

import PuzzleCellComponent from './components/puzzle-cell';
import PuzzleFieldComponent from './components/puzzle-field';
import PuzzleMenuComponent from './components/puzzle-menu';
import PuzzleMovesComponent from './components/puzzle-moves';
import PuzzleStatsComponent from './components/puzzle-stats';
import PuzzleTimeComponent from './components/puzzle-time';
import RestartButtonComponent from './components/restart-button';
import SaveButtonComponent from './components/save-button';

export default class PuzzleController {
  constructor(container, puzzleModel) {
    this.container = container;
    this.puzzleModel = puzzleModel;
    this.size = DEFAULT_LEVEL;
    this.startTime = null;
    this.moves = null;

    this.emptyCellComponent = null;
    this.activeCellComponent = null;
    this.puzzleTimeComponent = null;
    this.puzzleMovesComponent = null;

    this.makeMove = this.makeMove.bind(this);
    this.dragAndDrop = this.dragAndDrop.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.swapSells = this.swapSells.bind(this);
  }

  render() {
    this.startTime = new Date();
    this.moves = 0;
    this.container.innerHTML = '';
    this.renderPuzzleStats();
    this.renderPuzzleField();
    this.renderPuzzleMenu();
  }

  renderPuzzleStats() {
    const puzzleStatsComponent = new PuzzleStatsComponent();
    this.puzzleTimeComponent = new PuzzleTimeComponent();
    this.puzzleMovesComponent = new PuzzleMovesComponent();

    render(puzzleStatsComponent.getElement(), this.puzzleTimeComponent, this.puzzleMovesComponent);
    render(this.container, puzzleStatsComponent);

    this.puzzleTimeComponent.update(this.startTime);
    this.puzzleMovesComponent.update(this.moves);
  }

  renderPuzzleField() {
    const cellSize = puzzleLevelToPercentCellSize[this.size];
    const puzzleCells = this.puzzleModel.get();
    const puzzleFieldComponent = new PuzzleFieldComponent();

    puzzleCells.forEach((cell) => {
      const puzzleCellComponent = new PuzzleCellComponent(cell, cellSize);
      puzzleCellComponent.setClickHandler(this.makeMove);
      puzzleCellComponent.setMouseDownHandler(this.dragAndDrop);
      if (cell.value === null) {
        this.emptyCellComponent = puzzleCellComponent;
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
    const { row: emptyCellRow, column: emptyCellColumn } = this.emptyCellComponent.getValue();
    const { row, column } = cell.getValue();

    const rowDiff = Math.abs(emptyCellRow - row);
    const columnDiff = Math.abs(emptyCellColumn - column);

    if (rowDiff + columnDiff > 1 || cell === this.emptyCellComponent) {
      return;
    }

    const swap = { row: emptyCellRow, column: emptyCellColumn };
    this.emptyCellComponent.update({ row, column });
    cell.update(swap);
    this.moves += 1;
    this.puzzleMovesComponent.update(this.moves);
    this.puzzleModel.update(this.emptyCellComponent.getValue(), cell.getValue());
  }

  dragAndDrop(cell) {
    const { row: emptyCellRow, column: emptyCellColumn } = this.emptyCellComponent.getValue();
    const { row, column } = cell.getValue();

    const rowDiff = Math.abs(emptyCellRow - row);
    const columnDiff = Math.abs(emptyCellColumn - column);

    if (rowDiff + columnDiff > 1 || cell === this.emptyCellComponent) {
      return;
    }

    this.activeCellComponent = cell;
    cell.setDragProps();
    this.emptyCellComponent.setDropProps(this.swapSells);
  }

  swapSells(emptyCell) {
    const { row: emptyCellRow, column: emptyCellColumn } = emptyCell.getValue();
    const { row, column } = this.activeCellComponent.getValue();

    const swap = { row: emptyCellRow, column: emptyCellColumn };
    emptyCell.update({ row, column });
    this.activeCellComponent.update(swap);
    this.moves += 1;
    this.puzzleMovesComponent.update(this.moves);
    this.puzzleModel.update(emptyCell.getValue(), this.activeCellComponent.getValue());
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
