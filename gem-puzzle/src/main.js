import PuzzleController from './puzzle-controller';
import SettingsController from './settings-controller';
import PuzzleModel from './puzzle-model';

const root = document.querySelector('body');
const puzzleContainer = document.createElement('div');
puzzleContainer.classList.add('wrapper');
root.append(puzzleContainer);

const puzzleModel = new PuzzleModel();
const puzzleController = new PuzzleController(puzzleContainer, puzzleModel);
const settingsController = new SettingsController(root, puzzleModel);

puzzleController.render();
settingsController.render();
