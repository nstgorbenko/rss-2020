import GameController from './controllers/game-controller';
import CardsModel from './models/cards-model';
import CARDS from './data';

const page = document.querySelector('.page__wrapper');

const cardsModel = new CardsModel(CARDS);
const gameController = new GameController(page, cardsModel);

gameController.render();
