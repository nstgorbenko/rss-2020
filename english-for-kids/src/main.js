import GameController from './controllers/game-controller';
import CardsModel from './models/cards-model';
import CARDS from './data';

const header = document.querySelector('.header');
const main = document.querySelector('.main');

const cardsModel = new CardsModel(CARDS);
const gameController = new GameController(header, main, cardsModel);

gameController.render();
