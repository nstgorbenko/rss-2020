import GameController from './controllers/game-controller';
import CardsModel from './models/cards-model';
import CARDS from './data';
import Store from './store';

const page = document.querySelector('.page__wrapper');

const store = new Store(window.localStorage);
const cardsModel = new CardsModel(CARDS, store);
const gameController = new GameController(page, cardsModel);

gameController.render();
