import { Parameter, Screen } from '@/constants/constants';
import { AppStateInterface } from '@/types/entities';

interface ActionInterface {
  type: string;
  payload: string | Parameter | Screen;
}

const initialState: AppStateInterface = {
  country: '',
  parameter: Parameter.CONFIRMED,
  activeScreen: Screen.ALL,
};

const ActionType = {
  CHANGE_COUNTRY: 'CHANGE_COUNTRY',
  CHANGE_PARAMETER: 'CHANGE_PARAMETER',
  CHANGE_ACTIVE_SCREEN: 'CHANGE_ACTIVE_SCREEN',
};

const ActionCreator = {
  changeCountry: (country: string): ActionInterface => ({
    type: ActionType.CHANGE_COUNTRY,
    payload: country,
  }),
  changeParameter: (parameter: Parameter): ActionInterface => ({
    type: ActionType.CHANGE_PARAMETER,
    payload: parameter,
  }),
  changeActiveScreen: (screen: Screen): ActionInterface => ({
    type: ActionType.CHANGE_ACTIVE_SCREEN,
    payload: screen,
  }),
};

const reducer = (state = initialState, action: ActionInterface): AppStateInterface => {
  switch (action.type) {
    case ActionType.CHANGE_COUNTRY:
      return { ...state, country: action.payload };
    case ActionType.CHANGE_PARAMETER:
      return { ...state, parameter: action.payload as Parameter };
    case ActionType.CHANGE_ACTIVE_SCREEN:
      return { ...state, activeScreen: action.payload as Screen };
    default:
      return state;
  }
};

export { ActionCreator, ActionType, reducer };
