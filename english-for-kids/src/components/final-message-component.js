import AbstractComponent from './abstract-component';
import { GameMessage, Sound } from '../const';

const createFinalMessageTemplate = () => (
  `<div class="message">
      <div class="message__wrapper">
        <div class="message__text"></div>
      </div>
    </div>`
);

export default class FinalMessageComponent extends AbstractComponent {
  getTemplate() {
    return createFinalMessageTemplate();
  }

  show(errorsCount) {
    const message = errorsCount ? `${GameMessage.LOSE}${errorsCount}` : GameMessage.WIN;
    const messageClass = errorsCount ? 'message--lose' : 'message--win';
    const audioMessage = errorsCount ? Sound.LOSE : Sound.WIN;

    this.getElement().querySelector('.message__text').textContent = message;
    this.getElement().classList.add('message--show', `${messageClass}`);
    new Audio(audioMessage).play();
  }

  hide() {
    this.getElement().className = 'message';
  }
}
