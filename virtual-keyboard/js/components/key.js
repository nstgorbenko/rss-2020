import AbstractComponent from "./abstract-component.js";
import {Case, INTERACTIVE_KEYS, KeyWidth} from "../const.js";

const createKeyTemplate = (key, activeCase, isActiveShift) => {
    const {upper, lower, code} = key;

    const isSymbolKey = upper !== null && lower.toUpperCase() !== upper;
    const isFuncKey = upper === null;
    const isInteractiveKey = INTERACTIVE_KEYS.indexOf(code) !== -1;
    const isCaps = activeCase === Case.UPPER;

    const isUpperSymbol = isSymbolKey || (!isFuncKey && isCaps && !isActiveShift) || (!isFuncKey && !isCaps && isActiveShift);
    const isLowerSymbol = isSymbolKey || isFuncKey || (!isCaps && !isActiveShift) || (isCaps && isActiveShift);

    const isCapsLockActive = isCaps && code === 'CapsLock';
    const isShiftActive = isActiveShift && (code === 'ShiftLeft' || code === 'ShiftRight');
    const activeKeyClass = `${isCapsLockActive ? ` keyboard__key--interactive-on` : ''}
      ${isShiftActive ? ` keyboard__key--interactive-on` : ''}`;

    const isMaxWideKey = KeyWidth.MAX_WIDE.indexOf(code) !== -1;
    const isWideKey = KeyWidth.WIDE.indexOf(code) !== -1;
    const isSmallKey = KeyWidth.SMALL.indexOf(code) !== -1;
    const extraClass = `${isMaxWideKey ? ` keyboard__key--wide-max` : ''}
      ${isWideKey ? ` keyboard__key--wide` : ''}
      ${isSmallKey ? ` keyboard__key--small` : ''}
      ${isInteractiveKey ? ` keyboard__key--interactive` : ''}`;

    return (
        `<div class="keyboard__key${extraClass}${activeKeyClass}">
            <div class="upper">${isUpperSymbol ? upper : ''}</div>
            <div class="lower">${isLowerSymbol ? lower : ''}</div>
        </div>`
    );
};


export default class Key extends AbstractComponent {
    constructor(key, activeCase, isActiveShift) {
        super();
        this._item = key;
        this._activeCase = activeCase;
        this._isActiveShift = isActiveShift;
    }

    getTemplate() {
      return createKeyTemplate(this._item, this._activeCase, this._isActiveShift);
    }

    getCode() {
      return this._item.code;
    }

    handleClick(handler) {
      if (this._item.code === 'CapsLock') {
        this._activeCase = this._activeCase === Case.LOWER ? Case.UPPER : Case.LOWER;
      }
      if (this._item.code === 'ShiftLeft' || this._item.code === 'ShiftRight') {
        this._isActiveShift = !this._isActiveShift;
      }

      handler(this._item, this._activeCase, this._isActiveShift);
    }

    simulateKeyDown(handler) {
      this.getElement().classList.add('keyboard__key--clicked');
      this.handleClick(handler);
    }

    simulateKeyUp() {
      this.getElement().classList.remove('keyboard__key--clicked');
    }
  
    setClickHandler(handler) {
      this.getElement().addEventListener(`click`, () => {
        this.handleClick(handler);
      });
    }
  }