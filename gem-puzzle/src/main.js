import PuzzleController from './puzzle-controller';
import SettingsController from './settings-controller';
import PuzzleModel from './puzzle-model';

const root = document.querySelector('body');

const puzzleModel = new PuzzleModel();
const puzzleController = new PuzzleController(root, puzzleModel);
const settingsController = new SettingsController(root, puzzleModel);

puzzleController.render();
settingsController.render();
