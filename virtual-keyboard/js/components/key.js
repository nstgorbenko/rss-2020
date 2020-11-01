import AbstractComponent from "./abstract-component.js";
import {Case, INTERACTIVE_KEYS, KeyWidth, Language, Sound} from "../const.js";

const createKeyTemplate = (key, activeCase, isActiveShift, isMute, isDial) => {
    const {upper, lower, code} = key;

    const isSymbolKey = upper !== null && lower.toUpperCase() !== upper;
    const isFuncKey = upper === null;
    const isInteractiveKey = INTERACTIVE_KEYS.indexOf(code) !== -1;
    const isCaps = activeCase === Case.UPPER;

    const isUpperSymbol = isSymbolKey || (!isFuncKey && isCaps && !isActiveShift) || (!isFuncKey && !isCaps && isActiveShift);
    const isLowerSymbol = isSymbolKey || isFuncKey || (!isCaps && !isActiveShift) || (isCaps && isActiveShift);

    const isCapsLockActive = isCaps && code === 'CapsLock';
    const isShiftActive = isActiveShift && (code === 'ShiftLeft' || code === 'ShiftRight');
    const isSoundActive = !isMute && code === 'Sound';
    const isVoiceDialActive = isDial && code === 'VoiceDial';
    const activeKeyClass = `${(isCapsLockActive || isShiftActive || isSoundActive || isVoiceDialActive) ? ` keyboard__key--interactive-on` : ''}`;

    const isMaxWideKey = KeyWidth.MAX_WIDE.indexOf(code) !== -1;
    const isWideKey = KeyWidth.WIDE.indexOf(code) !== -1;
    const isSmallKey = KeyWidth.SMALL.indexOf(code) !== -1;
    const funcClass = isFuncKey ? ` keyboard__key--${code}` : '';
    const extraClass = `${isMaxWideKey ? ' keyboard__key--wide-max' : ''}
      ${isWideKey ? ' keyboard__key--wide' : ''}
      ${isSmallKey ? ' keyboard__key--small' : ''}
      ${isInteractiveKey ? ' keyboard__key--interactive' : ''}
      ${funcClass}`;

    return (
        `<div class="keyboard__key${extraClass}${activeKeyClass}">
            <div class="upper">${isUpperSymbol ? upper : ''}</div>
            <div class="lower">${isLowerSymbol ? lower : ''}</div>
        </div>`
    );
};


export default class Key extends AbstractComponent {
    constructor(key, activeCase, isActiveShift, lang, isMute, isDial) {
        super();
        this._item = key;
        this._activeCase = activeCase;
        this._isActiveShift = isActiveShift;
        this._lang = lang;
        this._isMute = isMute;
        this._isDial = isDial;
    }

    getTemplate() {
      return createKeyTemplate(this._item, this._activeCase, this._isActiveShift, this._isMute, this._isDial);
    }

    getCode() {
      return this._item.code;
    }

    simulateKeyDown(handler) {
      this.getElement().classList.add('keyboard__key--clicked');
      this._handleClick(handler);
    }

    simulateKeyUp() {
      this.getElement().classList.remove('keyboard__key--clicked');
    }
  
    setClickHandler(handler) {
      this.getElement().addEventListener(`click`, () => {
        this._handleClick(handler);
      });
    }

    _playSound() {
      let tone = '';

      if (this._item.code === 'CapsLock') {
        tone = Sound.CAPS_LOCK;
      } else if (this._item.code === 'Enter') {
        tone = Sound.ENTER;
      } else if (this._item.code === 'Backspace') {
        tone = Sound.BACKSPACE;
      } else if (this._item.code === 'ShiftLeft' || this._item.code === 'ShiftRight') {
        tone = Sound.SHIFT;
      } else if (this._lang === Language.RU) {
        tone = Sound.RU;
      } else {
        tone = Sound.EN;
      }

      tone.play();
    }

    _handleClick(handler) {
      !this._isMute && this._playSound();

      if (this._item.code === 'CapsLock') {
        this._activeCase = this._activeCase === Case.LOWER ? Case.UPPER : Case.LOWER;
      }
      if (this._item.code === 'ShiftLeft' || this._item.code === 'ShiftRight') {
        this._isActiveShift = !this._isActiveShift;
      }
      if (this._item.code === 'Sound') {
        this._isMute = !this._isMute;
      }
      if (this._item.code === 'VoiceDial') {
        this._isDial = !this._isDial;
      }

      handler(this._item, this._activeCase, this._isActiveShift, this._isMute, this._isDial);
    }
  }