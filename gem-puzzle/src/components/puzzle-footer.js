import AbstractComponent from './abstract-component';

const createPuzzleFooterTemplate = () => ('<div class="footer"></div>');

export default class PuzzleFooter extends AbstractComponent {
  getTemplate() {
    return createPuzzleFooterTemplate();
  }
}
