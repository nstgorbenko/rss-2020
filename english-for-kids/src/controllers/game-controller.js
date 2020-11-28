import CatalogController from './catalog-controller';
import NavigationComponent from '../components/navigation-component';
import ToggleComponent from '../components/toggle-component';
import { render } from '../utils';
import { RenderPosition } from '../const';

export default class GameController {
  constructor(headerContainer, mainContainer, cardsModel) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    this.cardsModel = cardsModel;

    this.catalogController = null;

    this.pageChangeHandler = this.pageChangeHandler.bind(this);
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this);

    this.cardsModel.addCategoryChangeHandler(this.categoryChangeHandler);
  }

  render() {
    const cards = this.cardsModel.get();
    const links = this.cardsModel.getCategories();

    const navigationComponent = new NavigationComponent(links);
    navigationComponent.setLinkClickHandler(this.pageChangeHandler);
    const toggleComponent = new ToggleComponent();
    this.catalogController = new CatalogController(this.mainContainer);

    render(this.headerContainer, navigationComponent, RenderPosition.AFTERBEGIN);
    render(this.headerContainer, toggleComponent);
    this.catalogController.render(cards);
  }

  pageChangeHandler(newPage) {
    this.cardsModel.setCategory(newPage);
  }

  categoryChangeHandler() {
    const cards = this.cardsModel.get();
    this.catalogController.update(cards);
  }
}
