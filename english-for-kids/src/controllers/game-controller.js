import CatalogController from './catalog-controller';
import FinalMessageComponent from '../components/final-message';
import NavigationComponent from '../components/navigation-component';
import ToggleComponent from '../components/toggle-component';
import { render } from '../utils';
import { GameMode, MAIN_CATEGORY, RenderPosition } from '../const';

export default class GameController {
  constructor(pageContainer, cardsModel) {
    this.pageContainer = pageContainer;
    this.cardsModel = cardsModel;

    this.mode = GameMode.TRAIN;

    this.catalogController = null;
    this.navigationComponent = null;
    this.finalMessageComponent = null;
    this.toggleComponent = null;

    this.pageChangeHandler = this.pageChangeHandler.bind(this);
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
    this.changeGameMode = this.changeGameMode.bind(this);
    this.finishGame = this.finishGame.bind(this);
    this.resetGame = this.resetGame.bind(this);

    this.cardsModel.addCategoryChangeHandler(this.categoryChangeHandler);
  }

  render() {
    const cards = this.cardsModel.get();
    const links = this.cardsModel.getCategories();

    this.navigationComponent = new NavigationComponent(links);
    this.navigationComponent.setLinkClickHandler(this.pageChangeHandler);

    this.toggleComponent = new ToggleComponent();
    this.toggleComponent.setClickHandler(this.changeGameMode);

    this.catalogController = new CatalogController(this.pageContainer.querySelector('.main'), this.cardsModel, this.mode);
    this.catalogController.addEndGameHandler(this.finishGame);

    this.finalMessageComponent = new FinalMessageComponent();

    render(this.pageContainer.querySelector('.header'), this.navigationComponent, RenderPosition.AFTERBEGIN);
    render(this.pageContainer.querySelector('.header'), this.toggleComponent);
    this.catalogController.render(cards);
    render(this.pageContainer, this.finalMessageComponent);
  }

  pageChangeHandler(newPage) {
    this.cardsModel.setCategory(newPage);
  }

  categoryChangeHandler() {
    const cards = this.cardsModel.get();
    const newLink = cards[0].category;

    this.catalogController.update(cards, this.mode);
    this.navigationComponent.update(newLink);
  }

  changeGameMode() {
    this.mode = this.mode === GameMode.TRAIN ? GameMode.PLAY : GameMode.TRAIN;
    this.catalogController.changeMode(this.mode);
  }

  finishGame(errorsCount) {
    this.finalMessageComponent.show(errorsCount);
    setTimeout(this.resetGame, 3000);
  }

  resetGame() {
    this.finalMessageComponent.hide();
    this.toggleComponent.triggerClick();
    this.cardsModel.setCategory(MAIN_CATEGORY);
    this.changeGameMode();
  }
}
