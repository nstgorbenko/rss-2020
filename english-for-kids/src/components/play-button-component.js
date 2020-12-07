import AbstractComponent from './abstract-component';
import { Category } from '../const';

const createPlayButtonTemplate = (title) => {
  const absentClass = title === Category.MAIN ? 'btn--absent' : '';

  return (
    `<div class="btn-field">
      <button class="btn btn--round btn--hide ${absentClass} play-btn" type="button">Play</button>
    </div>`
  );
};

export default class PlayButtonComponent extends AbstractComponent {
  constructor(title) {
    super();
    this.title = title;
  }

  getTemplate() {
    return createPlayButtonTemplate(this.title);
  }

  changeView() {
    this.getElement().querySelector('button').classList.toggle('btn--hide');
    this.getElement().querySelector('button').classList.remove('play-btn--active');
  }

  update(title = Category.MAIN) {
    const isHide = title === Category.MAIN || title === '';
    const isAlreadyHide = this.getElement().querySelector('button').classList.contains('btn--absent');

    this.getElement().querySelector('button').classList.remove('play-btn--active');
    if ((isAlreadyHide && !isHide) || (!isAlreadyHide && isHide)) {
      this.getElement().querySelector('button').classList.toggle('btn--absent');
    }
  }

  setClickHandler(handler) {
    this.getElement().querySelector('button').addEventListener('click', () => {
      this.getElement().querySelector('button').classList.add('play-btn--active');
      handler();
    });
  }
}
