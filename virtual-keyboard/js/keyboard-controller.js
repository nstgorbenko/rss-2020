import KeyboardComponent from "./components/keyboard.js";
import KeyComponent from "./components/key.js";
import RowComponent from "./components/row.js";

import {render} from "./utils.js";
import {Case, Language, ROWS_ORDER} from "./const.js";


export default class KeyboardController {
  constructor(container, output, keyboardModel) {
    this._container = container;
    this._output = output;
    this._keyboardModel = keyboardModel;

    this._case = Case.LOWER;
    this._isActiveShift = false;
    this._lang = Language.RU;
    this._isMute = true;
    this._text = '';

    this._keys = [];
    this._changeOutput = this._changeOutput.bind(this);
    this._listenPhysicalKeyboard();
  }

  render() {
    const container = this._container;
    this._keys = [];
    container.innerHTML = '';
    const keyboard = new KeyboardComponent();

    for (let i = 0; i < ROWS_ORDER.length; i++) {
        const row = new RowComponent();
        for (let j = 0; j < ROWS_ORDER[i].length; j++) {
            const keyCode = ROWS_ORDER[i][j];
            const keyInfo = this._keyboardModel.getKey(keyCode);
            const key = new KeyComponent(keyInfo, this._case, this._isActiveShift, this._lang, this._isMute);
            key.setClickHandler(this._changeOutput);
            this._keys.push(key);
            render(row.getElement(), key);
        }
        render(keyboard.getElement(), row);
    }
    render(container, keyboard);
  }

  _listenPhysicalKeyboard() {
    document.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      const currentKey = this._keys.find((key) => key.getCode() === evt.code);
      if (!currentKey) {
        return;
      }
      currentKey.simulateKeyDown(this._changeOutput);
    });

    document.addEventListener('keyup', (evt) => {
      evt.preventDefault();
      const currentKey = this._keys.find((key) => key.getCode() === evt.code);
      if (!currentKey) {
        return;
      }
      currentKey.simulateKeyUp();
    });
  }

  _updateOutput() {
    this._output.value = this._text;
  }

  _changeOutput(symbol, activeCase, isActiveShift, isMute) {
    const output = this._output;
    output.focus();

    let cursorPosition = this._output.selectionStart;
    const {value: textValue} = this._output;
    const {code} = symbol;

    const leftTextPart = textValue.slice(0, cursorPosition);
    const rightTextPart = textValue.slice(cursorPosition);

    switch (code) {
      case 'Delete':
        const textToDelete = this._output.value.slice(this._output.selectionStart, this._output.selectionEnd);
        
        if (textToDelete.length > 0) {
          this._text = `${textValue.slice(0, this._output.selectionStart)}${textValue.slice(this._output.selectionEnd)}`;
        } else {
          this._text = `${leftTextPart}${rightTextPart.slice(1)}`;
        }
        break;
      case 'Tab':
        this._text = `${leftTextPart}\t${rightTextPart}`;
        cursorPosition += 1;
        break;
      case 'Backspace':
        const selectedText = this._output.value.slice(this._output.selectionStart, this._output.selectionEnd);

        if (selectedText.length > 0) {
          this._text = `${textValue.slice(0, this._output.selectionStart)}${textValue.slice(this._output.selectionEnd)}`;
        } else {
          this._text = `${leftTextPart.slice(0, -1)}${rightTextPart}`;
          cursorPosition -= 1;
        }
        break;
      case 'CapsLock':
        this._case = activeCase;
        this.render();
        break;
      case 'Enter':
        this._text = `${leftTextPart}\n${rightTextPart}`;
        cursorPosition += 1;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this._isActiveShift = isActiveShift;
        this.render();
        break;
      case 'ControlLeft':
      case 'ControlRight':
      case 'AltLeft':
      case 'AltRight':
        break;
      case 'SwitchLang':
        this._lang = this._keyboardModel.switchLang();
        this.render();
        break;
      // case 'VoiceDial':
      //   break;
      case 'ArrowLeft':
        cursorPosition = cursorPosition !== 0 ? cursorPosition - 1 : 0;
        break;
      case 'ArrowRight':
        cursorPosition += 1;
        break;
      case 'ArrowUp':
        const leftParagraphString = leftTextPart.split('\n');
        if (leftParagraphString.length <= 1) {
          return;
        }
        const leftStringPart = leftParagraphString[leftParagraphString.length - 1];
        cursorPosition -= (leftStringPart.length + 1);
        break;
      case 'ArrowDown':
        const rightParagraphString = rightTextPart.split('\n');
        if (rightParagraphString.length <= 1) {
          return;
        }
        const rightStringPart = rightParagraphString[0].length + rightParagraphString[1].length;
        cursorPosition += (rightStringPart + 1);
        break;
      case 'Sound':
        this._isMute = isMute;
        this.render();
        break;
      default:
        const isSymbolKey = symbol.upper !== null && symbol.lower.toUpperCase() !== symbol.upper;
        let caseToShow;
        if (isSymbolKey && !this._isActiveShift) {
          caseToShow = Case.LOWER;
        } else if (isSymbolKey && this._isActiveShift) {
          caseToShow = Case.UPPER;
        } else if (!isSymbolKey && !this._isActiveShift) {
          caseToShow = this._case;
        } else if (!isSymbolKey && this._isActiveShift) {
          caseToShow = this._case === Case.LOWER ? Case.UPPER : Case.LOWER;
        }
        
        this._text = `${leftTextPart}${symbol[caseToShow]}${rightTextPart}`;
        cursorPosition += 1;  
    }

    this._updateOutput();
    output.setSelectionRange(cursorPosition, cursorPosition);
  }
}