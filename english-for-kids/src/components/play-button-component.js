import AbstractComponent from './abstract-component';
import { MAIN_CATEGORY } from '../const';

const createPlayButtonTemplate = (title) => {
  const absentClass = title === MAIN_CATEGORY ? 'btn--absent' : '';

  return (
    `<button class="btn btn--round btn--hide ${absentClass} play-btn" type="button">Play</button>`
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
    this.getElement().classList.toggle('btn--hide');
  }

  update(title) {
    const isHide = title === MAIN_CATEGORY;
    const isAlreadyHide = this.getElement().classList.contains('btn--absent');

    if ((isAlreadyHide && !isHide) || (!isAlreadyHide && isHide)) {
      this.getElement().classList.toggle('btn--absent');
    }
  }

  setClickHandler(handler) {
    this.getElement().addEventListener('click', () => {
      this.getElement().classList.add('play-btn--active');
      handler();
    });
  }
}
