import AbstractComponent from './abstract-component';

const createSaveButtonTemplate = () => ('<button class="button" type="button">Save</button>');

export default class SaveButton extends AbstractComponent {
  getTemplate() {
    return createSaveButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', () => {
      handler();
    });
  }
}
