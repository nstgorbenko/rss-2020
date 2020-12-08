import CardsModel from '../models/cards-model';
import { StatsCardType } from '../types';
import StatsContainerComponent from '../components/stats-container-component';
import StatsRepeatComponent from '../components/stats-repeat-component';
import StatsResetComponent from '../components/stats-reset-component';
import StatsTableComponent from '../components/stats-table-component';
import { render } from '../utils';

export default class StatsController {
  statsContainerComponent: StatsContainerComponent | null;
  statsTableComponent: StatsTableComponent | null;
  statsRepeatComponent: StatsRepeatComponent;

  constructor(
    public container: HTMLElement,
    public cardsModel: CardsModel) {

    this.container = container;
    this.cardsModel = cardsModel;

    this.statsContainerComponent = null;
    this.statsTableComponent = null;
    this.statsRepeatComponent = new StatsRepeatComponent();

    this.resetStats = this.resetStats.bind(this);
  }

  render(): void {
    const statsCards: Array<StatsCardType> = this.cardsModel.getStats();

    this.statsContainerComponent = new StatsContainerComponent();
    render(this.statsContainerComponent.getElement(), this.statsRepeatComponent);

    const statsResetComponent: StatsResetComponent = new StatsResetComponent();
    statsResetComponent.setClickHandler(this.resetStats);
    render(this.statsContainerComponent.getElement(), statsResetComponent);

    this.statsTableComponent = new StatsTableComponent();
    this.statsTableComponent.update(statsCards);
    render(this.statsContainerComponent.getElement(), this.statsTableComponent);

    render(this.container, this.statsContainerComponent);
  }

  resetStats(): void {
    this.cardsModel.resetStats();
    this.update();
  }

  setRepeatBtnClickHandler(handler: (newPage: string) => void): void {
    this.statsRepeatComponent.setClickHandler(handler);
  }

  show(): void {
    if (this.statsTableComponent === null) {
      this.render();
    } else {
      this.update();
      this.statsContainerComponent.show();
    }
  }

  update(): void {
    const statsCards: Array<StatsCardType> = this.cardsModel.getStats();
    this.statsTableComponent.update(statsCards);
  }

  hide(): void {
    if (this.statsContainerComponent !== null) {
      this.statsContainerComponent.hide();
    }
  }
}
