import React from 'react';
import { useDispatch } from 'react-redux';

import { getRecentIncidents, subscribeIncidents } from '../store/actions/incidents';

import ScreensRoot from '../screens/Root';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRecentIncidents());
    dispatch(subscribeIncidents());
  }, [dispatch]);

  return <ScreensRoot />;
}

export default App;
