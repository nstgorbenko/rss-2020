import AbstractComponent from './abstract-component';

const createToggleTemplate = () => (
  `<div class="toggle">
    <input class="toggle__item visually-hidden" id="game-toggle" type="checkbox">
    <label class="btn toggle__btn" for="game-toggle">
      <span class="toggle__state toggle__state--on">Play</span>
      <span class="toggle__state toggle__state--off">Train</span>
      <span class="toggle__slider"></span>
    </label>
  </div>`);

export default class ToggleComponent extends AbstractComponent {
  getTemplate() {
    return createToggleTemplate();
  }

  setClickHandler(handler) {
    this.getElement().querySelector('.toggle__item').addEventListener('change', handler);
  }

  triggerClick() {
    this.getElement().querySelector('.toggle__item').checked = false;
  }
}
