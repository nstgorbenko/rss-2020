export const Case = {
    LOWER: 'lower',
    UPPER: 'upper',
};

export const INTERACTIVE_KEYS = ['CapsLock', 'ShiftLeft', 'ShiftRight', 'Sound', 'VoiceDial'];

export const KeyWidth = {
    MAX_WIDE: ['Space', 'ShiftLeft'],
    WIDE: ['Tab', 'Backspace', 'CapsLock', 'Enter', 'ShiftRight'],
    SMALL: ['Sound']
  };

export const Language = {
    EN: 'en',
    RU: 'ru',
};

export const ROWS_ORDER = [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backslash', 'Delete'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
    ['ControlLeft', 'SwitchLang', 'AltLeft', 'VoiceDial', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Sound'],
];