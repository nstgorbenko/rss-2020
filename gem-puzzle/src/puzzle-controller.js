import { DEFAULT_LEVEL, SOUND } from './const';
import { render } from './utils';

import GiveUpButtonComponent from './components/give-up-button';
import PuzzleCellComponent from './components/puzzle-cell';
import PuzzleFieldComponent from './components/puzzle-field';
import PuzzleFooterComponent from './components/puzzle-footer';
import PuzzleMessageComponent from './components/puzzle-message';
import PuzzleMovesComponent from './components/puzzle-moves';
import PuzzleInfoComponent from './components/puzzle-info';
import PuzzleTimeComponent from './components/puzzle-time';
import RestartButtonComponent from './components/restart-button';
import SaveButtonComponent from './components/save-button';

export default class PuzzleController {
  constructor(container, puzzleModel) {
    this.container = container;
    this.puzzleModel = puzzleModel;

    this.puzzleContainer = null;
    this.level = DEFAULT_LEVEL;
    this.image = null;
    this.startTime = null;
    this.time = null;
    this.movesCount = null;
    this.isSound = false;
    this.cellComponents = [];
    this.isFailed = false;
    this.isWon = false;

    this.emptyCellComponent = null;
    this.activeCellComponent = null;
    this.puzzleTimeComponent = null;
    this.puzzleMovesComponent = null;
    this.settingsComponent = null;
    this.puzzleMessageComponent = null;

    this.makeMove = this.makeMove.bind(this);
    this.dragAndDrop = this.dragAndDrop.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.showDecision = this.showDecision.bind(this);
    this.swapSells = this.swapSells.bind(this);
    this.soundModeChangeHandler = this.soundModeChangeHandler.bind(this);
    this.levelModeChangeHandler = this.levelModeChangeHandler.bind(this);

    this.puzzleModel.addSoundModeChangeHandler(this.soundModeChangeHandler);
    this.puzzleModel.addLevelModeChangeHandler(this.levelModeChangeHandler);
  }

  render() {
    this.puzzleMessageComponent = new PuzzleMessageComponent();
    render(this.container, this.puzzleMessageComponent);

    this.puzzleContainer = document.createElement('div');
    this.puzzleContainer.classList.add('wrapper');
    this.container.append(this.puzzleContainer);
    this.rerender();
  }

  rerender() {
    this.startTime = new Date();
    this.movesCount = 0;
    this.isFailed = false;
    this.isWon = false;
    this.puzzleContainer.innerHTML = '';
    this.renderPuzzleStats();
    this.renderPuzzleField();
    this.renderPuzzleMenu();
  }

  renderPuzzleStats() {
    const puzzleInfoComponent = new PuzzleInfoComponent();
    this.puzzleTimeComponent = new PuzzleTimeComponent();
    this.puzzleMovesComponent = new PuzzleMovesComponent();

    render(puzzleInfoComponent.getElement(), this.puzzleTimeComponent, this.puzzleMovesComponent);
    render(this.puzzleContainer, puzzleInfoComponent);

    this.puzzleTimeComponent.update(this.startTime);
    this.puzzleMovesComponent.update(this.movesCount);
  }

  renderPuzzleField() {
    const { cells, image, level } = this.puzzleModel.get();
    this.image = image;
    this.level = level;
    this.cellComponents = [];
    const puzzleFieldComponent = new PuzzleFieldComponent();

    cells.forEach((cell) => {
      const puzzleCellComponent = new PuzzleCellComponent(cell, this.level, this.image);
      this.cellComponents.push(puzzleCellComponent);
      puzzleCellComponent.setClickHandler(this.makeMove);
      puzzleCellComponent.setMouseDownHandler(this.dragAndDrop);
      if (cell.value === null) {
        this.emptyCellComponent = puzzleCellComponent;
      }
      render(puzzleFieldComponent.getElement(), puzzleCellComponent);
    });

    render(this.puzzleContainer, puzzleFieldComponent);
  }

  renderPuzzleMenu() {
    const puzzleFooterComponent = new PuzzleFooterComponent();
    const restartButtonComponent = new RestartButtonComponent();
    const giveUpButtonComponent = new GiveUpButtonComponent();
    const saveButtonComponent = new SaveButtonComponent();

    restartButtonComponent.setClickHandler(this.restartGame);
    giveUpButtonComponent.setClickHandler(this.showDecision);
    saveButtonComponent.setClickHandler(this.saveGame);

    render(puzzleFooterComponent.getElement(),
      restartButtonComponent, giveUpButtonComponent, saveButtonComponent);
    render(this.puzzleContainer, puzzleFooterComponent);
  }

  makeMove(cell) {
    const { row: emptyCellRow, column: emptyCellColumn } = this.emptyCellComponent.getValue();
    const { row, column } = cell.getValue();

    const rowDiff = Math.abs(emptyCellRow - row);
    const columnDiff = Math.abs(emptyCellColumn - column);

    if (rowDiff + columnDiff > 1 || cell === this.emptyCellComponent) {
      return;
    }

    this.makeSound();
    const swap = { row: emptyCellRow, column: emptyCellColumn };
    this.emptyCellComponent.update({ row, column });
    cell.update(swap);
    this.movesCount += 1;
    this.puzzleMovesComponent.update(this.movesCount);
    this.puzzleModel.update(this.emptyCellComponent.getValue(), cell.getValue());
    this.checkWinning();
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
    this.makeSound();

    const swap = { row: emptyCellRow, column: emptyCellColumn };
    emptyCell.update({ row, column });
    this.activeCellComponent.update(swap);
    this.movesCount += 1;
    this.puzzleMovesComponent.update(this.movesCount);
    this.puzzleModel.update(emptyCell.getValue(), this.activeCellComponent.getValue());
    this.checkWinning();
  }

  saveGame() {
    const cellsState = this.puzzleModel.getCurrentState();
    localStorage.setItem('cells', JSON.stringify(cellsState));

    const movesState = this.puzzleModel.getMoves();
    localStorage.setItem('moves', JSON.stringify(movesState));
  }

  restartGame() {
    this.puzzleModel.resetCurrentState();
    this.rerender();
  }

  soundModeChangeHandler() {
    this.isSound = !this.isSound;
  }

  levelModeChangeHandler() {
    this.rerender();
  }

  makeSound() {
    if (this.isSound) {
      SOUND.play();
    }
  }

  checkWinning() {
    if (this.isWon) {
      return;
    }
    const cells = this.puzzleModel.getCurrentState();
    const isFinish = cells
      .filter(({ value }) => value !== null)
      .every(({ row, column, value }) => value === row * this.level + column + 1);

    if (isFinish) {
      this.isWon = true;
      this.time = this.puzzleTimeComponent.getTime();
      this.puzzleMessageComponent.show(this.time, this.movesCount);
      this.saveWinningInfo({ moves: this.movesCount, time: this.time, level: this.level });
    }
  }

  saveWinningInfo(newWinning) {
    const currentWinnings = JSON.parse(localStorage.getItem('wins')) || [];
    currentWinnings.push(newWinning);
    const newWinnings = currentWinnings
      .sort((a, b) => a.moves - b.moves)
      .slice(0, 10);
    localStorage.setItem('wins', JSON.stringify(newWinnings));
  }

  showDecision() {
    if (this.isFailed) {
      return;
    }

    this.isFailed = true;
    this.puzzleTimeComponent.stopTime();
    const moves = this.puzzleModel.getMoves().reverse();

    for (let i = 0; i < moves.length; i += 1) {
      setTimeout(() => {
        const cellsToMove = moves[i];
        const firstCellToMoveComponent = this.cellComponents
          .find((component) => component.getValue().value === cellsToMove[0].value);
        const secondCellToMoveComponent = this.cellComponents
          .find((component) => component.getValue().value === cellsToMove[1].value);

        const { row: firstCellRow, column: firstCellColumn } = firstCellToMoveComponent.getValue();
        const {
          row: secondCellRow, column: secondCellColumn,
        } = secondCellToMoveComponent.getValue();
        const swap = {
          row: firstCellRow, column: firstCellColumn,
        };
        this.makeSound();

        firstCellToMoveComponent.update({ row: secondCellRow, column: secondCellColumn });
        secondCellToMoveComponent.update(swap);
      }, 200 * (i + 1));
    }
  }
}
