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
    `<nav class="navigation">
      <ul class="navigation__list">
        ${navigationLinksMarkup}
      </ul>
    </nav>`
  );
};

export default class NavigationComponent extends AbstractComponent {
  constructor(links) {
    super();

    this.links = links;
    this.category = MAIN_CATEGORY;
  }

  getTemplate() {
    return createNavigationTemplate(this.links, this.category);
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', (evt) => {
      if (evt.target.dataset.name === this.category || evt.target.tagName !== 'LI') {
        return;
      }

      this.changeActiveLink(evt.target);
      this.category = evt.target.dataset.name;
      handler(this.category);
    });
  }

  changeActiveLink(newLink) {
    const lastActiveLink = this.getElement().querySelector(`.${ACTIVE_LINK_CLASS}`);
    lastActiveLink.classList.remove(ACTIVE_LINK_CLASS);
    newLink.classList.add(ACTIVE_LINK_CLASS);
  }
}
