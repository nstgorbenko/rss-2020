export enum Category {
  MAIN = 'main',
  STATS = 'stats',
};

export enum Direction {
  UP = 'up',
  DOWN = 'down',
};

export enum GameMessage {
  LOSE =  'You lose. Errors: ',
  WIN = 'You win!',
};

export enum GameMode {
  PLAY = 'play',
  TRAIN = 'train',
};

export enum RenderPosition {
  BEFOREBEGIN = 'beforebegin',
  AFTERBEGIN = 'afterbegin',
  BEFOREEND = 'beforeend',
  AFTEREND = 'afterend',
};

export enum SortType {
  CATEGORY = 'category',
  ENGLISH = 'english',
  RUSSIAN = 'russian',
  LEARN = 'learn',
  CORRECT = 'correct',
  WRONG = 'wrong',
  PERCENT = 'percent',
};

export enum Sound {
  LOSE = './audio/lose.mp3',
  RIGHT = './audio/right.mp3',
  WIN = './audio/win.mp3',
  WRONG = './audio/wrong.mp3',
};

export enum StatsField {
  LEARN = 'learn',
  CORRECT = 'correct',
  WRONG = 'wrong',
};
