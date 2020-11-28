import AbstractComponent from './abstract-component';
import { uppercaseFirstLetter } from '../utils';
import { MAIN_CATEGORY } from '../const';

const ACTIVE_LINK_CLASS = 'navigation__item--active';

const createNavigationLinkMarkup = (link, activeCategory) => {
  const linkName = uppercaseFirstLetter(link);
  const linkClass = `navigation__item--${link}`;
  const activeLinkClass = link === activeCategory ? ACTIVE_LINK_CLASS : '';

  return (
    `<li class="navigation__item ${linkClass} ${activeLinkClass}" data-name="${link}">${linkName}</li>`
  );
};

const createNavigationTemplate = (links, activeCategory) => {
  const navigationLinksMarkup = links
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
  constructor(links) {
    super();

    this.links = links;
    this.category = MAIN_CATEGORY;

    this.setToggleClickHandler();
    this.closeNavigation = this.closeNavigation.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate(this.links, this.category);
  }

  setLinkClickHandler(handler) {
    this.getElement().querySelector('.navigation__list').addEventListener('click', (evt) => {
      if (evt.target.dataset.name === this.category || evt.target.tagName !== 'LI') {
        return;
      }

      this.changeActiveLink(evt.target);
      this.category = evt.target.dataset.name;
      handler(this.category);
    });
  }

  setToggleClickHandler() {
    this.getElement().querySelector('.burger__item').addEventListener('click', () => {
      document.addEventListener('click', this.closeNavigation);
    });
  }

  changeActiveLink(newLink) {
    const lastActiveLink = this.getElement().querySelector(`.${ACTIVE_LINK_CLASS}`);
    lastActiveLink.classList.remove(ACTIVE_LINK_CLASS);
    newLink.classList.add(ACTIVE_LINK_CLASS);
  }

  closeNavigation(evt) {
    const ignoredClasses = ['navigation__wrapper', 'navigation__list', 'burger__item', 'burger__btn', 'burger__line'];
    const isIgnoredElement = ignoredClasses
      .some((ignoredClass) => evt.target.classList.contains(ignoredClass));

    if (isIgnoredElement) {
      return;
    }

    this.getElement().querySelector('.burger__item').checked = false;
    document.removeEventListener('click', this.closeNavigation);
  }
}
