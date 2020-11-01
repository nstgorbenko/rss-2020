import AbstractComponent from "./abstract-component.js";

const createRowTemplate = () => {
  return (
    `<div class="keyboard__row"></div>`
  );
};


export default class Row extends AbstractComponent {
  getTemplate() {
    return createRowTemplate();
  }
}