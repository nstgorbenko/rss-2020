import AbstractComponent from './abstract-component';

const createHeaderButtonsTemplate = () => ('<div class="header__buttons"></div>');

export default class HeaderButtonsComponent extends AbstractComponent {
  getTemplate() {
    return createHeaderButtonsTemplate();
  }
}
