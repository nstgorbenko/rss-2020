import AbstractComponent from './abstract-component';

const createHeaderButtonsTemplate = (): string => ('<div class="header__buttons"></div>');

export default class HeaderButtonsComponent extends AbstractComponent {
  getTemplate(): string {
    return createHeaderButtonsTemplate();
  }
}
