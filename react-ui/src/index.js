import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import configureStore from './store/configureStore';

import { loadState, useLocalStorageSync } from './utils/localStorage';

import GlobalStyle from './styles/global';
import theme from './styles/theme';

import App from './components/App';

const store = configureStore(loadState('hfd-state'));

function Root() {
  useLocalStorageSync(store, 'hfd-state');

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  serviceWorker.unregister();
}
