import AbstractComponent from './abstract-component';

const createRestartButtonTemplate = () => ('<button class="button" type="button">Restart</button>');

export default class RestartButton extends AbstractComponent {
  getTemplate() {
    return createRestartButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', () => {
      handler();
    });
  }
}
