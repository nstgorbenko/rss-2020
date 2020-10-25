const IMAGES_COUNT = 6;
const IMAGES_TOTAL_COUNT = 20;

const DayTime = {
  NIGHT: 'night',
  MORNING: 'morning',
  AFTERNOON: 'day',
  EVENING: 'evening',
};
const Hour = {
  NIGHT: 6,
  MORNING: 12,
  AFTERNOON: 18,
};
const Greeting = {
  NIGHT: 'Good night,\u00a0',
  MORNING: 'Good morning,\u00a0',
  AFTERNOON: 'Good afternoon,\u00a0',
  EVENING: 'Good evening,\u00a0',
}
const Key = {
  NAME: 'name',
  FOCUS: 'focus',
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let todayImages = [];
let currentImage = 0;

const page = document.querySelector('.page');
const date = document.querySelector('.date');
const hours = document.querySelector('.time__hours');
const minutes = document.querySelector('.time__minutes');
const seconds = document.querySelector('.time__seconds');
const colons = document.querySelectorAll('.time__colon');

const greeting = document.querySelector('.greeting__phrase');
const name = document.querySelector('.greeting__name');
const focus = document.querySelector('.focus__point');

const prevBtn = document.querySelector('.slide-btn--prev');
const nextBtn = document.querySelector('.slide-btn--next');

const addZero = (number) => String(number).padStart(2, '0');
const isEmpty = (string) => string.trim() === '';
const isEnterKey = ({key}) => key === 'Enter';
const getRandomIntegerNumber = (min, max) => min + Math.floor(Math.random() * (max - min));

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
}

const setGreetingPhrase = () => {
  const today = new Date();
  const hour = today.getHours();

  if (hour < Hour.NIGHT) {
    greeting.textContent = Greeting.NIGHT;
  } else if (hour < Hour.MORNING) {
    greeting.textContent = Greeting.MORNING;
  } else if (hour < Hour.AFTERNOON) {
    greeting.textContent = Greeting.AFTERNOON;
  } else {
    greeting.textContent = Greeting.EVENING;
  }
}

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

const getUniqueNumbersList = (numbersCount, upperLimit) => {
  const images = [];

  while (images.length < numbersCount) {
    const randomImageIndex = getRandomIntegerNumber(1, upperLimit + 1);

    if (images.indexOf(randomImageIndex) === -1) {
      images.push(randomImageIndex);
    } else {
      continue;
    }
  }

  return images;
};

const createDayTimeImageList = (dayTime, indexList) => {
  const imageList  = [];

  for (let i = 0; i < indexList.length; i++) {
    imageList.push(`assets/images/${dayTime}/${addZero(indexList[i])}.jpg`);
  }

  return imageList;
}

const createImageList = () => {
  const imageList = [];
  const imageIndexes = getUniqueNumbersList(IMAGES_COUNT, IMAGES_TOTAL_COUNT);

  const night = createDayTimeImageList(DayTime.NIGHT, imageIndexes);
  const morning = createDayTimeImageList(DayTime.MORNING, imageIndexes);
  const afternoon = createDayTimeImageList(DayTime.AFTERNOON, imageIndexes);
  const evening = createDayTimeImageList(DayTime.EVENING, imageIndexes);

  return [...night, ...morning, ...afternoon, ...evening];
};

const disableSliderButtons = () => {
  prevBtn.disabled = true;
  nextBtn.disabled = true;
};

const enableSliderButtons = () => {
  prevBtn.disabled = false;
  nextBtn.disabled = false;
};

const setBackground = (hour) => {
  disableSliderButtons();
  const image = document.createElement('img');
  image.src = todayImages[hour];
  image.onload = () => {
    page.style.backgroundImage = `url("assets/images/overlay.png"), url(${todayImages[hour]})`;
    currentImage = hour;
    image.remove();
    enableSliderButtons();
  };
};

const changeBackground = (imageNumber) => {
  if (imageNumber < 0) {
    currentImage = 23;
  } else if (imageNumber > 23) {
    currentImage = 0;
  } else {
    currentImage = imageNumber;
  }
  setBackground(currentImage);
};

const setChangeOnTime = () => {
  const today = new Date();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

  showTime();
  if (hour === 0 && minute === 0 && second === 0) {
    showDate();
  }

  if (minute === 0 && second === 0) {
    setBackground(hour);
    setGreetingPhrase();
  }

  setTimeout(setChangeOnTime, 1000);
};

const init = () => {
  const today = new Date();
  todayImages = createImageList();

  setBackground(today.getHours()); // TODO: show page when image loaded
  setGreetingPhrase();

  showDate();
  showTime();

  getValue(name);
  getValue(focus);

  name.addEventListener('click', setValue);
  focus.addEventListener('click', setValue);

  prevBtn.addEventListener('click', () => changeBackground(currentImage - 1));
  nextBtn.addEventListener('click', () => changeBackground(currentImage + 1));
}

init();
setChangeOnTime();