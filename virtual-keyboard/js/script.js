import KeyboardController from "./keyboard-controller.js";
import KeyboardModel from "./keyboard-model.js";
import layouts from "./layouts/index.js";

const keyboardContainer = document.querySelector('.input');
const toggle = document.querySelector('.toggle');
const output = document.querySelector('.output');

const keyboardModel = new KeyboardModel(layouts);
const keyboardController = new KeyboardController(keyboardContainer, output, keyboardModel);

keyboardController.render();

toggle.addEventListener('click', () => {
    if (keyboardContainer.classList.contains('input--hidden')) {
        keyboardContainer.classList.remove('input--hidden');
        toggle.textContent = 'Close keyboard';
    } else {
        keyboardContainer.classList.add('input--hidden');
        toggle.textContent = 'Open keyboard';
    }
});