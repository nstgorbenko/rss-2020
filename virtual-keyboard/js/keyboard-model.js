import {Language} from "./const.js";

export default class KeyboardModel {
  constructor(layouts) {
    this._layouts = layouts;
    this._activeLang = Language.RU;
    this._keys = this._layouts[Language.RU];
  }

  get() {
    return this._keys;
  }

  getKey(keyCode) {
    return this._keys.find(({code}) => code === keyCode);
  }

  switchLang() {
    this._activeLang = this._activeLang === Language.RU ? Language.EN : Language.RU;
    this._keys = this._layouts[this._activeLang];
  }
}