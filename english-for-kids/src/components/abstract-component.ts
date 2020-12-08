import { createElement } from '../utils';

export default abstract class AbstractComponent {
  element: HTMLElement | null;

  constructor() {
    this.element = null;
  }

  abstract getTemplate(): string

  getElement(): HTMLElement {
    if (this.element === null) {
      this.element = createElement(this.getTemplate()) as HTMLElement;
    }
    return this.element;
  }

  removeElement(): void {
    this.element = null;
  }
}
