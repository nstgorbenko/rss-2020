import AbstractComponent from './abstract-component';

const createSettingsButtonTemplate = () => ('<button class="button" type="button">Settings</button>');

export default class SettingsButton extends AbstractComponent {
  getTemplate() {
    return createSettingsButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', () => {
      handler();
    });
  }
}
