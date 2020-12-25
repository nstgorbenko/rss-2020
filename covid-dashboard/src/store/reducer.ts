import { combineReducers } from 'redux';

import { reducer as appReducer } from '@/store/app/app';
import { reducer as dataReducer } from '@/store/data/data';

export default combineReducers({
  APP: appReducer,
  DATA: dataReducer,
});
