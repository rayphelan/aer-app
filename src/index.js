import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './app/globalStyle';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// Fetch aircraft
import { fetchAircraft } from './features/aircraft/aircraftSlice';
store.dispatch(fetchAircraft());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
