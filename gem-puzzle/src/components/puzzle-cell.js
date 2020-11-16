import AbstractComponent from './abstract-component';
import { IMAGE_SIZE } from '../const';

const createPuzzleCellTemplate = ({ row, column, value }, level, image) => {
  const isEmptyCell = value === null;
  const emptyCellClass = isEmptyCell ? 'field__cell--empty' : '';

  const cellSize = Number((100 / level).toFixed(2));
  const leftPosition = column * cellSize;
  const topPosition = row * cellSize;
  const winningColumn = (value - 1) % level;
  const winningRow = Math.trunc((value - 1) / level);
  const leftImagePosition = IMAGE_SIZE - winningColumn * (IMAGE_SIZE / level) - IMAGE_SIZE;
  const topImagePosition = IMAGE_SIZE - winningRow * (IMAGE_SIZE / level) - IMAGE_SIZE;

  return (
    `<div class='field__cell ${emptyCellClass}' style='
      top: ${topPosition}%;
      left: ${leftPosition}%;
      width: ${cellSize}%;
      height: ${cellSize}%;
      ${isEmptyCell ? '' : `background-image: url(${image});`}
      background-repeat: no-repeat;
      background-size: ${IMAGE_SIZE * 100};
      background-position: ${leftImagePosition}px ${topImagePosition}px;'
    ></div>`
  );
};

export default class PuzzleCell extends AbstractComponent {
  constructor(item, level, image) {
    super();
    this.item = item;
    this.level = level;
    this.image = image;
    this.clickHandler = null;
    this.mousedownHandler = null;
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
  }

  getTemplate() {
    return createPuzzleCellTemplate(this.item, this.level, this.image);
  }

  setClickHandler(handler) {
    this.clickHandler = handler;
    this.getElement().addEventListener('click', () => {
      handler(this);
    });
  }

  setMouseDownHandler(handler) {
    this.mousedownHandler = handler;
    this.getElement().addEventListener('mousedown', () => {
      handler(this);
    });
  }

  getValue() {
    return this.item;
  }

  update(newData) {
    this.item = { ...this.item, ...newData };
    this.rerender();
  }

  rerender() {
    const oldElement = this.getElement();
    this.removeElement();
    oldElement.replaceWith(this.getElement());
    this.recoveryListeners();
  }

  recoveryListeners() {
    this.setClickHandler(this.clickHandler);
    this.setMouseDownHandler(this.mousedownHandler);
  }

  dragStartHandler() {
    setTimeout(() => {
      this.getElement().classList.add('hide');
    }, 0)
  }

  dragEndHandler() {
    this.getElement().classList.remove('hide');
    this.unsetDragProps();
  }

  setDragProps() {
    this.getElement().draggable = 'true';
    this.getElement().addEventListener('dragstart', this.dragStartHandler);
    this.getElement().addEventListener('dragend', this.dragEndHandler);
  }

  unsetDragProps() {
    this.getElement().draggable = '';
    this.getElement().removeEventListener('dragstart', this.dragStartHandler);
    this.getElement().removeEventListener('dragend', this.dragEndHandler);
  }

  setDropProps(handler) {
    this.getElement().addEventListener('dragover', (evt) => {
      evt.preventDefault();
    });
    this.getElement().addEventListener('drop', () => {
      handler(this);
    });
  }
}
