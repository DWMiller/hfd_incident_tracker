import React from 'react';
import { useDispatch } from 'react-redux';

import { subscribeIncidents } from '../store/middleware/incidents';
import { fetchRecentIncidents } from '../store/modules/incidents';

import ScreensRoot from '../screens/Root';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRecentIncidents());
    dispatch(subscribeIncidents());
  }, [dispatch]);

  return <ScreensRoot />;
}

export default App;
