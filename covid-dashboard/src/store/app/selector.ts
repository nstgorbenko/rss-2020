import { Parameter, Screen } from '@/constants/constants';
import { StateInterface } from '@/types/entities';

export const getCountry = (state: StateInterface): string => state['APP'].country;
export const getParameter = (state: StateInterface): Parameter => state['APP'].parameter;
export const getActiveScreen = (state: StateInterface): Screen => state['APP'].activeScreen;
