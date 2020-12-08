import AbstractComponent from './abstract-component';
import { Category } from '../const';

const createCatalogTemplate = (title: string): string => {
  const shownTitle: string = title !== Category.MAIN ? title : '';
  return (
    `<div class="catalog">
      <h2 class="catalog__title">${shownTitle}</h2>
    </div>`
  );
};

export default class CatalogComponent extends AbstractComponent {
  constructor(
    public title: string) {

    super();
    this.title = title;
  }

  getTemplate(): string {
    return createCatalogTemplate(this.title);
  }

  update(title: string): void {
    const shownTitle: string = title === Category.MAIN || title === Category.STATS ? '' : title;
    this.getElement().querySelector('.catalog__title').textContent = shownTitle;
  }

  hide(): void {
    this.getElement().classList.add('hide');
  }

  show(): void {
    this.getElement().classList.remove('hide');
  }
}
