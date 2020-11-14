import PuzzleController from './puzzle-controller';
import PuzzleModel from './puzzle-model';

const root = document.querySelector('body');

const puzzleModel = new PuzzleModel();
const puzzleController = new PuzzleController(root, puzzleModel);

puzzleController.render();
