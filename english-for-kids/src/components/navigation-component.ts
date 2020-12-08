import AbstractComponent from './abstract-component';
import { Category } from '../const';
import { uppercaseFirstLetter } from '../utils';

const ACTIVE_LINK_CLASS: string = 'navigation__item--active';

const createNavigationLinkMarkup = (link: string, activeCategory: string): string => {
  const linkName: string = uppercaseFirstLetter(link);
  const linkClass: string = `navigation__item--${link}`;
  const activeLinkClass: string = link === activeCategory ? ACTIVE_LINK_CLASS : '';

  return (
    `<li class="navigation__item ${linkClass} ${activeLinkClass}" data-name="${link}">${linkName}</li>`
  );
};

const createNavigationTemplate = (links: Array<string>, activeCategory: string) => {
  const navigationLinksMarkup: string = links
    .map((link) => createNavigationLinkMarkup(link, activeCategory))
    .join('\n');

  return (
    `<div class="navigation">
      <input class="burger__item visually-hidden" id="nav-toggle" type="checkbox">
      <label class="burger__btn" for="nav-toggle">
        <span class="burger__line"></span>
      </label>

      <nav class="navigation__wrapper">
        <ul class="navigation__list">
          ${navigationLinksMarkup}
        </ul>
      </nav>
    </div>`
  );
};

export default class NavigationComponent extends AbstractComponent {
  category: string;

  constructor(
    public links: Array<string>) {

    super();
    this.links = links;
    this.category = Category.MAIN;

    this.setToggleClickHandler();
    this.closeNavigation = this.closeNavigation.bind(this);
  }

  getTemplate(): string {
    return createNavigationTemplate(this.links, this.category);
  }

  setLinkClickHandler(handler: (category: string) => void): void {
    this.getElement().querySelector('.navigation__list').addEventListener('click', (evt: Event) => {
      const target = evt.target as HTMLElement;

      if (target.dataset.name === this.category || target.tagName !== 'LI') {
        return;
      }

      this.changeActiveLink(target);
      this.category = target.dataset.name;
      handler(this.category);
    });
  }

  update(newCategory?: string): void {
    if (!newCategory) {
      this.category = '';
      this.changeActiveLink();
    } else {
      const newLinkElement = this.getElement().querySelector(`.navigation__item--${newCategory}`) as HTMLElement;
      this.changeActiveLink(newLinkElement);
      this.category = newCategory;
    }
  }

  setToggleClickHandler(): void {
    this.getElement().querySelector('.burger__item').addEventListener('click', () => {
      document.addEventListener('click', this.closeNavigation);
    });
  }

  changeActiveLink(newLink?: HTMLElement): void {
    const lastActiveLink: HTMLElement = this.getElement().querySelector(`.${ACTIVE_LINK_CLASS}`);
    if (lastActiveLink) {
      lastActiveLink.classList.remove(ACTIVE_LINK_CLASS);
    }
    if (newLink) {
      newLink.classList.add(ACTIVE_LINK_CLASS);
    }
  }

  closeNavigation(evt: Event): void {
    const ignoredClasses: Array<string> = ['navigation__wrapper', 'navigation__list', 'burger__item', 'burger__btn', 'burger__line'];
    const isIgnoredElement: boolean = ignoredClasses
      .some((ignoredClass) => (<HTMLElement> evt.target).classList.contains(ignoredClass));

    if (isIgnoredElement) {
      return;
    }

    (<HTMLInputElement> this.getElement().querySelector('.burger__item')).checked = false;
    document.removeEventListener('click', this.closeNavigation);
  }
}
