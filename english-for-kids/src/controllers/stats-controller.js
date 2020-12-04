import StatsContainerComponent from '../components/stats-container-component';
import StatsRepeatComponent from '../components/stats-repeat-component';
import StatsResetComponent from '../components/stats-reset-component';
import StatsTableComponent from '../components/stats-table-component';
import { render } from '../utils';

export default class StatsController {
  constructor(container, cardsModel) {
    this.container = container;
    this.cardsModel = cardsModel;
  }

  show() {
    this.render();
  }

  render() {
    const statsCards = this.cardsModel.getStats();

    const statsContainerComponent = new StatsContainerComponent();
    const statsRepeatComponent = new StatsRepeatComponent();
    render(statsContainerComponent.getElement(), statsRepeatComponent);

    const statsResetComponent = new StatsResetComponent();
    render(statsContainerComponent.getElement(), statsResetComponent);

    const statsTableComponent = new StatsTableComponent();
    statsTableComponent.update(statsCards);
    render(statsContainerComponent.getElement(), statsTableComponent);

    render(this.container, statsContainerComponent);
  }
}
