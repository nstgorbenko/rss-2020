import AbstractComponent from "./abstract-component.js";

const createKeyboardTemplate = () => {
  return (
    `<div class="keyboard"></div>`
  );
};


export default class Keyboard extends AbstractComponent {
  getTemplate() {
    return createKeyboardTemplate();
  }
}