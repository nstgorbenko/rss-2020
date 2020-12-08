import AbstractComponent from './abstract-component';

const createCatalogTemplate = (): string => ('<ul class="catalog__list"></ul>');

export default class CatalogComponent extends AbstractComponent {
  getTemplate(): string {
    return createCatalogTemplate();
  }

  clear(): void {
    this.getElement().innerHTML = '';
  }
}
