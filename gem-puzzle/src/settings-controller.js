import { render } from './utils';
import PuzzleSettingsComponent from './components/puzzle-settings';
import SettingsButtonComponent from './components/settings-button';

export default class SettingsController {
  constructor(container, puzzleModel) {
    this.container = container;
    this.puzzleModel = puzzleModel;
    this.settingsButtonComponent = null;
    this.puzzleSettingsComponent = null;

    this.show = this.show.bind(this);
    this.soundChangeHandler = this.soundChangeHandler.bind(this);
    this.levelChangeHandler = this.levelChangeHandler.bind(this);
    this.statsClickChangeHandler = this.statsClickChangeHandler.bind(this);
  }

  render() {
    this.settingsButtonComponent = new SettingsButtonComponent();
    this.puzzleSettingsComponent = new PuzzleSettingsComponent();

    this.settingsButtonComponent.setClickHandler(this.show);
    this.puzzleSettingsComponent.setChangeSoundHandler(this.soundChangeHandler);
    this.puzzleSettingsComponent.setChangeLevelHandler(this.levelChangeHandler);
    this.puzzleSettingsComponent.setStatsClickHandler(this.statsClickChangeHandler);

    render(this.container, this.settingsButtonComponent, this.puzzleSettingsComponent);
  }

  show() {
    this.puzzleSettingsComponent.show();
  }

  soundChangeHandler(isLoud) {
    this.puzzleModel.setSoundMode(isLoud);
  }

  levelChangeHandler(level) {
    this.puzzleModel.setLevel(level);
    this.puzzleSettingsComponent.hide();
  }

  statsClickChangeHandler() {
    const stats = this.puzzleModel.getStats() || [];
    this.puzzleSettingsComponent.renderStats(stats);
  }
}
