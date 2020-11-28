import AbstractComponent from './abstract-component';

const createCatalogTemplate = () => ('<ul class="catalog__list"></ul>');

export default class CatalogComponent extends AbstractComponent {
  getTemplate() {
    return createCatalogTemplate();
  }

  clear() {
    this.getElement().innerHTML = '';
  }
}
