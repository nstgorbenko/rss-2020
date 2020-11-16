import AbstractComponent from './abstract-component';

const createPuzzleMessageTemplate = () => {
  return (
    `<div class="message">
      <div class="message__wrapper">
        <p class="message__title">Hooray!</p>
        <p class="message__text">You solved the puzzle in 01:15 and 24 moves!</p>
        <button class="message__button" type="button">Close</button>
      </div>
    </div>`
  );
};

export default class PuzzleMessage extends AbstractComponent {
  constructor() {
    super();

    this.hide = this.hide.bind(this);
    this.subscribeOnEvents();
  }

  getTemplate() {
    return createPuzzleMessageTemplate();
  }

  show(time, moves) {
    this.updateMessage(time, moves);
    this.getElement().classList.add('message--show');
  }

  hide() {
    this.getElement().classList.remove('message--show');
  }

  updateMessage(time, moves) {
    this.getElement().querySelector('.message__text').textContent = `You solved the puzzle in ${time} and ${moves} moves!`;
  }

  subscribeOnEvents() {
    this.getElement().querySelector('.message__button').addEventListener('click', this.hide);
  }
}
