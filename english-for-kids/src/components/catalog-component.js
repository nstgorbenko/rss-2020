import AbstractComponent from './abstract-component';
import { Category } from '../const';

const createCatalogTemplate = (title) => {
  const shownTitle = title !== Category.MAIN ? title : '';
  return (
    `<div class="catalog">
      <h2 class="catalog__title">${shownTitle}</h2>
    </div>`
  );
};

export default class CatalogComponent extends AbstractComponent {
  constructor(title) {
    super();

    this.title = title;
  }

  getTemplate() {
    return createCatalogTemplate(this.title);
  }

  update(title) {
    const shownTitle = title === Category.MAIN || title === Category.STATS ? '' : title;
    this.getElement().querySelector('.catalog__title').textContent = shownTitle;
  }

  hide() {
    this.getElement().classList.add('hide');
  }

  show() {
    this.getElement().classList.remove('hide');
  }
}
