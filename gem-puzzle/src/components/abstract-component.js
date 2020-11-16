import { createElement } from '../utils';

export default class AbstractComponent {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate.');
  }

  getElement() {
    if (this.element === null) {
      this.element = createElement(this.getTemplate());
    }
    setTimeout(() => {
      this.getElement().style.opacity = 1;
    }, 100);
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
