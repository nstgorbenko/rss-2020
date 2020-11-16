import AbstractComponent from './abstract-component';

const createPuzzleSettingsTemplate = () => {
  return (
    `<div class="settings">
      <div class="settings__wrapper">
        <button class="settings__item-label settings__item-label--back" type="button">Back to game</button>
        <div class="settings__part">
          <p class="settings__name">New Game</p>
          <ul class="settings__list settings__list--level">
            <li class="settings__item">
              <input class="settings__item-input visually-hidden" type="radio" name="level" value="3" id="level-3">
              <label class="settings__item-label" for="level-3">3 * 3</label>
            </li>
            <li class="settings__item">
              <input class="settings__item-input visually-hidden" type="radio" name="level" value="4" id="level-4" checked>
              <label class="settings__item-label" for="level-4">4 * 4</label>
            </li>
            <li class="settings__item">
              <input class="settings__item-input visually-hidden" type="radio" name="level" value="5" id="level-5">
              <label class="settings__item-label" for="level-5">5 * 5</label>
            </li>
            <li class="settings__item">
              <input class="settings__item-input visually-hidden" type="radio" name="level" value="6" id="level-6">
              <label class="settings__item-label" for="level-6">6 * 6</label>
            </li>
            <li class="settings__item">
              <input class="settings__item-input visually-hidden" type="radio" name="level" value="7" id="level-7">
              <label class="settings__item-label" for="level-7">7 * 7</label>
            </li>
            <li class="settings__item">
              <input class="settings__item-input visually-hidden" type="radio" name="level" value="8" id="level-8">
              <label class="settings__item-label" for="level-8">8 * 8</label>
            </li>
          </ul>
        </div>
        <div class="settings__part">
          <p class="settings__name">Sound</p>
          <ul class="settings__list settings__list--audio">
            <li class="settings__item">
              <input class="settings__item-input visually-hidden" type="radio" name="sound" value="on" id="sound-on">
              <label class="settings__item-label" for="sound-on">On</label>
            </li>
            <li class="settings__item">
              <input class="settings__item-input visually-hidden" type="radio" name="sound" value="off" id="sound-off" checked>
              <label class="settings__item-label" for="sound-off">Off</label>
            </li>
          </ul>
        </div>
        <div class="settings__part">
          <p class="settings__name">Statistics</p>
          <button class="settings__item-label settings__item-label--wide" type="button">Show</button>
        </div>
      </div>
    </div>`
  );
};

export default class PuzzleSettings extends AbstractComponent {
  constructor() {
    super();
    this.isLoud = false;

    this.hide = this.hide.bind(this);
    this.subscribeOnEvents();
  }

  getTemplate() {
    return createPuzzleSettingsTemplate();
  }

  show() {
    this.getElement().classList.add('settings--show');
  }

  hide() {
    this.getElement().classList.remove('settings--show');
  }

  subscribeOnEvents() {
    this.getElement().querySelector('.settings__item-label--back').addEventListener('click', this.hide);
  }

  setChangeSoundHandler(handler) {
    this.getElement().querySelector('.settings__list--audio').addEventListener('change', (evt) => {
      this.isLoud = evt.target.value === 'on';
      handler(this.isLoud);
    });
  }

  setChangeLevelHandler(handler) {
    this.getElement().querySelector('.settings__list--level').addEventListener('click', (evt) => {
      if (evt.target.tagName === 'INPUT') {
        handler(Number(evt.target.value));
      }
    });
  }
}
