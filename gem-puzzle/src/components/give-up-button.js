import AbstractComponent from './abstract-component';

const createGiveUpButtonTemplate = () => ('<button class="button" type="button">Give up</button>');

export default class GiveUpButton extends AbstractComponent {
  getTemplate() {
    return createGiveUpButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', () => {
      handler();
    });
  }
}
