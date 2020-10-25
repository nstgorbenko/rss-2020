const Key = {
  NAME: 'name',
  FOCUS: 'focus',
};
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const date = document.querySelector('.date');
const hours = document.querySelector('.time__hours');
const minutes = document.querySelector('.time__minutes');
const seconds = document.querySelector('.time__seconds');
const colons = document.querySelectorAll('.time__colon');

const greeting = document.querySelector('.greeting__phrase');
const name = document.querySelector('.greeting__name');

const focus = document.querySelector('.focus__point');

const addZero = (number) => String(number).padStart(2, '0');
const isEnterKey = ({key}) => key === 'Enter';

const showDate = () => {
  const today = new Date();

  const weekday = WEEKDAYS[today.getDay()];
  const month = MONTHS[today.getMonth()];
  const day = today.getDate();

  date.textContent = `${weekday}, ${month} ${day}`;
};

const showTime = () => {
  const today = new Date();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();
  const isColon = second % 2 === 0;

  hours.textContent = `${addZero(hour)}`;
  minutes.textContent = `${addZero(minute)}`;
  seconds.textContent = `${addZero(second)}`;
  colons.forEach((colon) => {
    colon.style.opacity = isColon ? '1' : '0';
  });

  setTimeout(showTime, 1000);
}

const isEmpty = (string) => string.trim() === '';

const getValue = (field) => {
  const key = field.dataset.key;

  if (localStorage.getItem(key) === null) {
    field.textContent = `[enter ${key}]`;
  } else {
    field.textContent = localStorage.getItem(key);
  }
};

const writeValue = (evt) => {
  if (evt.type === 'blur' || (evt.type === 'keydown' && isEnterKey(evt))) {
    const field = evt.target;
    const key = field.dataset.key;
    
    if (isEmpty(field.textContent)) {
      getValue(field);
    } else {
      localStorage.setItem(key, field.textContent);
    }

    field.blur();
    field.removeEventListener('blur', writeValue);
    field.removeEventListener('keydown', writeValue);
  }
};

const setValue = (evt) => {
  const field = evt.target;
  field.textContent = '';

  field.addEventListener('blur', writeValue);
  field.addEventListener('keydown', writeValue);
};

const init = () => {
  showTime();
  showDate();
  getValue(name);
  getValue(focus);
  name.addEventListener('click', setValue);
  focus.addEventListener('click', setValue);
}

init();
