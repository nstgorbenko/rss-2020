import {
  DEFAULT_LEVEL, DIRECTION, IMAGE_COUNT, RANDOMIZER,
} from './const';

export default class PuzzleModel {
  constructor() {
    this.initialCells = [];
    this.currentCells = [];
    this.level = DEFAULT_LEVEL;
    this.image = './img/1.jpg';
    this.initialMoves = [];
    this.currentMoves = [];

    this.soundModeChangeHandlers = [];
    this.levelChangeHandlers = [];
  }

  get() {
    this.currentMoves = [];
    if (localStorage.getItem('cells') !== null) {
      this.initialCells = JSON.parse(localStorage.getItem('cells'));
      this.initialMoves = JSON.parse(localStorage.getItem('moves'));
    } else if (this.initialCells.length === 0) {
      this.initialCells = this.generateCellsOrder();
    }

    this.currentCells = this.initialCells;

    return ({ cells: this.initialCells, image: this.image, level: this.level });
  }

  getCurrentState() {
    return this.currentCells;
  }

  resetCurrentState() {
    localStorage.removeItem('cells');
  }

  setNewState() {
    localStorage.removeItem('cells');
    this.image = `./img/${Math.ceil(Math.random() * IMAGE_COUNT)}.jpg`;
    this.initialMoves = [];
    this.currentMoves = [];
    this.initialCells = this.generateCellsOrder();
    this.currentCells = this.initialCells;
  }

  update(...cells) {
    cells.forEach((cell) => {
      const cellIndex = this.currentCells.findIndex(({ value }) => value === cell.value);
      this.currentCells = [
        ...this.currentCells.slice(0, cellIndex),
        cell,
        ...this.currentCells.slice(cellIndex + 1),
      ];
    });
    this.currentMoves.push([...cells]);
  }

  generateCellsOrder() {
    const initialList = this.generateWinningList();
    return this.randomizeOrder(initialList);
  }

  generateWinningList() {
    const winningList = [];

    for (let i = 0; i < this.level * this.level; i += 1) {
      winningList.push({
        row: Math.trunc(i / this.level),
        column: i % this.level,
        value: i === this.level * this.level - 1 ? null : i + 1,
      });
    }

    return winningList;
  }

  randomizeOrder([...initialList]) {
    const nullCell = initialList[initialList.length - 1];

    for (let i = 0; i < RANDOMIZER; i += 1) {
      const moveDirection = DIRECTION[Math.floor(Math.random() * 4)];
      switch (moveDirection) {
        case 'top':
          if (nullCell.row !== 0) {
            const switchCell = initialList.find(({ row, column }) => (
              row === nullCell.row - 1 && column === nullCell.column
            ));
            switchCell.row += 1;
            nullCell.row -= 1;
            this.saveMove([switchCell, nullCell]);
          }
          break;
        case 'right':
          if (nullCell.column !== this.level - 1) {
            const switchCell = initialList.find(({ row, column }) => (
              row === nullCell.row && column === nullCell.column + 1
            ));
            switchCell.column -= 1;
            nullCell.column += 1;
            this.saveMove([switchCell, nullCell]);
          }
          break;
        case 'bottom':
          if (nullCell.row !== this.level - 1) {
            const switchCell = initialList.find(({ row, column }) => (
              row === nullCell.row + 1 && column === nullCell.column
            ));
            switchCell.row -= 1;
            nullCell.row += 1;
            this.saveMove([switchCell, nullCell]);
          }
          break;
        case 'left':
          if (nullCell.column !== 0) {
            const switchCell = initialList.find(({ row, column }) => (
              row === nullCell.row && column === nullCell.column - 1
            ));
            switchCell.column += 1;
            nullCell.column -= 1;
            this.saveMove([switchCell, nullCell]);
          }
          break;
        default:
          throw new Error('Unknown move direction');
      }
    }

    return initialList;
  }

  saveMove(newMove) {
    this.initialMoves.push(newMove);
  }

  getMoves() {
    return [...this.initialMoves, ...this.currentMoves];
  }

  setSoundMode(isLoud) {
    this.isLoudMode = isLoud;
    PuzzleModel.callHandlers(this.soundModeChangeHandlers);
  }

  setLevel(level) {
    this.level = level;
    this.setNewState();
    PuzzleModel.callHandlers(this.levelChangeHandlers);
  }

  addSoundModeChangeHandler(handler) {
    this.soundModeChangeHandlers.push(handler);
  }

  addLevelModeChangeHandler(handler) {
    this.levelChangeHandlers.push(handler);
  }

  getStats() {
    return JSON.parse(localStorage.getItem('wins'));
  }

  static callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
