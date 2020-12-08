import AbstractComponent from './abstract-component';
import { GameMessage, Sound } from '../const';

const createFinalMessageTemplate = ():string => (
  `<div class="message">
      <div class="message__wrapper">
        <div class="message__text"></div>
      </div>
    </div>`
);

export default class FinalMessageComponent extends AbstractComponent {
  getTemplate(): string {
    return createFinalMessageTemplate();
  }

  show(errorsCount: number): void {
    const message: string = errorsCount ? `${GameMessage.LOSE}${errorsCount}` : GameMessage.WIN;
    const messageClass: string = errorsCount ? 'message--lose' : 'message--win';
    const audioMessage: Sound = errorsCount ? Sound.LOSE : Sound.WIN;

    this.getElement().querySelector('.message__text').textContent = message;
    this.getElement().classList.add('message--show', `${messageClass}`);
    new Audio(audioMessage).play();
  }

  hide(): void {
    this.getElement().className = 'message';
  }
}
