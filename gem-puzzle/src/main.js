import PuzzleController from './puzzle-controller';
import PuzzleModel from './puzzle-model';

const root = document.querySelector('body');

const puzzleModel = new PuzzleModel();
const puzzleController = new PuzzleController(root, puzzleModel);

puzzleController.render();

// const timer = document.querySelector('.stats__time');

// const startTime = new Date();
// const startHour = startTime.getHours();
// const startMinute = startTime.getMinutes();
// const startSecond = startTime.getSeconds();

// const addZero = (number) => String(number).padStart(2, '0');

// const showTime = () => {
//   const now = new Date();
//   const hour = now.getHours() - startHour;
//   const minute = now.getMinutes() - startMinute;
//   const second = new Date(now - startTime).getSeconds();

//   timer.textContent = `Time: ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`

//   setTimeout(showTime, 1000);
// }

// showTime();
