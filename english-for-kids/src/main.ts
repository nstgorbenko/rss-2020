import CARDS from './data';
import CardsModel from './models/cards-model';
import GameController from './controllers/game-controller';
import Store from './store';

const page: HTMLElement = document.querySelector('.page__wrapper');

const store: Store = new Store(window.localStorage);
const cardsModel: CardsModel = new CardsModel(CARDS, store);
const gameController: GameController = new GameController(page, cardsModel);

gameController.render();
