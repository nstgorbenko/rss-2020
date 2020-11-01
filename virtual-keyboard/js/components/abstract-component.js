import {createElement} from "../utils.js";


export default class AbstractComponent {
    constructor() {  
      this._element = null;
    }
  
    getTemplate() {
      throw new Error(`Abstract method not implemented: getTemplate.`);
    }
  
    getElement() {
      if (this._element === null) {
        this._element = createElement(this.getTemplate());
      }
      return this._element;
    }
  }