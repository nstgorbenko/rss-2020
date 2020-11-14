import AbstractComponent from './abstract-component';

const createPuzzleCellTemplate = ({ row, column, value }, size) => {
  const isEmptyCell = value === null;
  const emptyCellClass = isEmptyCell ? 'field__cell--empty' : '';
  return (
    `<div class='field__cell ${emptyCellClass}' style='top: ${row * size}%; left: ${column * size}%;'>${value}</div>`
  );
};

export default class PuzzleCell extends AbstractComponent {
  constructor(item, size) {
    super();
    this.item = item;
    this.size = size;
    this.clickHandler = null;
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
  }
}
