import StatsContainerComponent from '../components/stats-container-component';
import StatsRepeatComponent from '../components/stats-repeat-component';
import StatsResetComponent from '../components/stats-reset-component';
import StatsTableComponent from '../components/stats-table-component';
import { render } from '../utils';

export default class StatsController {
  constructor(container, cardsModel) {
    this.container = container;
    this.cardsModel = cardsModel;

    this.statsContainerComponent = null;
    this.statsTableComponent = null;
    this.statsRepeatComponent = new StatsRepeatComponent();

    this.resetStats = this.resetStats.bind(this);
  }

  render() {
    const statsCards = this.cardsModel.getStats();

    this.statsContainerComponent = new StatsContainerComponent();
    render(this.statsContainerComponent.getElement(), this.statsRepeatComponent);

    const statsResetComponent = new StatsResetComponent();
    statsResetComponent.setClickHandler(this.resetStats);
    render(this.statsContainerComponent.getElement(), statsResetComponent);

    this.statsTableComponent = new StatsTableComponent();
    this.statsTableComponent.update(statsCards);
    render(this.statsContainerComponent.getElement(), this.statsTableComponent);

    render(this.container, this.statsContainerComponent);
  }

  resetStats() {
    this.cardsModel.resetStats();
    this.update();
  }

  setRepeatBtnClickHandler(handler) {
    this.statsRepeatComponent.setClickHandler(handler)
  }

  show() {
    if (this.statsTableComponent === null) {
      this.render();
    } else {
      this.update();
      this.statsContainerComponent.show();
    }
  }

  update() {
    const statsCards = this.cardsModel.getStats();
    this.statsTableComponent.update(statsCards);
  }

  hide() {
    if (this.statsContainerComponent !== null) {
      this.statsContainerComponent.hide();
    }
  }
}
