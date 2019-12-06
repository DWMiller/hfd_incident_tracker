import React from 'react';
import { Provider, useDispatch } from 'react-redux';

import configureStore from '../store/configureStore';

import { getRecentIncidents, subscribeIncidents } from '../store/actions/incidents';

import ScreensRoot from '../screens/Root';
import GlobalStyle from 'styles/global';
import { loadState, saveState } from 'utils/localStorage';

const store = configureStore(loadState('hfd-state'));

function OnLoad() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRecentIncidents());
    dispatch(subscribeIncidents());
  }, [dispatch]);

  return null;
}

function App() {
  React.useEffect(() => {
    store.subscribe(() => {
      //TODO Throttle/debounce
      // TODO More advanced whitelisting/blacklisting

      //! Careful when delete props, we are not deeply cloning the state and nested state is real state
      const state = { ...store.getState('hfd-state') };

      saveState(state, 'hfd-state');
    });
  }, []);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <OnLoad />
      <ScreensRoot />
    </Provider>
  );
}

export default App;
