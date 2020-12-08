import AbstractComponent from './components/abstract-component';
import { Category, Direction, RenderPosition, SortType } from './const';
import { StatsCardType } from './types';

export const calculateStatsPercent = ({ correct, wrong }: StatsCardType): number => {
  if (correct === 0) {
    return 0;
  }
  if (wrong === 0) {
    return 100;
  }
  return Math.trunc((correct / (correct + wrong)) * 100);
};

export const createElement = (template: string): HTMLElement => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild as HTMLElement;
};

export const getDifficultWords = ([...cards]: Array<StatsCardType>): Array<StatsCardType> => {
  return cards
    .filter(({ wrong }) => wrong !== 0)
    .sort((a, b) => calculateStatsPercent(a) - calculateStatsPercent(b))
    .map((card) => ({...card, category: Category.STATS}))
    .slice(0, 8);
}

export const getSortedCards = ([...cards]: Array<StatsCardType>, sortType: SortType, direction: Direction): Array<StatsCardType> | never => {
  switch (sortType) {
    case SortType.CATEGORY:
    case SortType.ENGLISH:
    case SortType.RUSSIAN:
      if (direction === Direction.DOWN) {
        return cards.sort((a, b) => a[sortType].localeCompare(b[sortType]));
      }
      return cards.sort((a, b) => b[sortType].localeCompare(a[sortType]));
    case SortType.LEARN:
    case SortType.CORRECT:
    case SortType.WRONG:
      if (direction === Direction.DOWN) {
        return cards.sort((a, b) => a[sortType] - b[sortType]);
      }
      return cards.sort((a, b) => b[sortType] - a[sortType]);
    case SortType.PERCENT:
      if (direction === Direction.DOWN) {
        return cards.sort((a, b) => calculateStatsPercent(a) - calculateStatsPercent(b));
      }
      return cards.sort((a, b) => calculateStatsPercent(b) - calculateStatsPercent(a));
    default:
      throw new Error(`Unknown sort type: ${sortType} and direction: ${direction}`);
  }
};

export const render = (container: HTMLElement, component: AbstractComponent, place: RenderPosition = RenderPosition.BEFOREEND): void | never => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
    case RenderPosition.AFTEREND:
      container.after(component.getElement());
      break;
    default:
      throw new Error(`Unknown render position: ${place}`);
  }
};

export const shuffleArray = (array: Array<any>): Array<any> => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

export const uppercaseFirstLetter = (string: string): string => {
  if (!string) {
    return string;
  }
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};
