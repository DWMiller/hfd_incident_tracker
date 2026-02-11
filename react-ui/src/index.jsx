import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import { loadState, useLocalStorageSync } from './utils/localStorage';

import GlobalStyle from './styles/global';
import theme from './styles/theme';

import ScreensRoot from './screens/Root';

const store = configureStore(loadState('hfd-state'));

function Root() {
  useLocalStorageSync(store, 'hfd-state');

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ScreensRoot />
      </ThemeProvider>
    </Provider>
  );
}

createRoot(document.getElementById('root')).render(<Root />);
