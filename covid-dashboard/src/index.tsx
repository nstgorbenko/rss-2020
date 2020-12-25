import '@/assets/stylesheets/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from '@/App';
import api from '@/api';
import { Operation } from '@/store/data/data';
import reducer from '@/store/reducer';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

const init = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

store
  .dispatch(Operation.loadGlobalData())
  .then(() => store.dispatch(Operation.loadCountriesData()))
  .then(() => store.dispatch(Operation.loadGlobalHistoricalData()))
  .then(() => init())
  .catch((error) => {
    throw error;
  });
