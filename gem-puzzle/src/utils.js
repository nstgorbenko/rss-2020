import { Duration } from './const';

const addZero = (number) => String(number).padStart(2, '0');

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, ...components) => {
  components.forEach((component) => container.append(component.getElement()));
};

export const formatDuration = (startTime) => {
  const now = new Date();
  const pastTime = now - startTime;

  const hour = Math.floor(pastTime / Duration.HOUR);
  const minute = Math.floor((pastTime % Duration.HOUR) / Duration.MINUTE);
  const second = Math.floor(((pastTime % Duration.HOUR) % Duration.MINUTE) / Duration.SECOND);

  return `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
};
