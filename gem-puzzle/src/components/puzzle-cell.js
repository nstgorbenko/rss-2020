import AbstractComponent from './abstract-component';

const createPuzzleCellTemplate = ({ row, column, value }, size) => {
  const isEmptyCell = value === null;
  const emptyCellClass = isEmptyCell ? 'field__cell--empty' : '';
  return (
    `<div class='field__cell ${emptyCellClass}' style='top: ${row * size}%; left: ${column * size}%; width: ${size}%; height: ${size}%'>${value}</div>`
  );
};

export default class PuzzleCell extends AbstractComponent {
  constructor(item, size) {
    super();
    this.item = item;
    this.size = size;
    this.clickHandler = null;
    this.mousedownHandler = null;
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
  }

  getTemplate() {
    return createPuzzleCellTemplate(this.item, this.size);
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
