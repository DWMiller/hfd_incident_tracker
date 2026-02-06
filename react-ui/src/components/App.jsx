import React from 'react';
import { useDispatch } from 'react-redux';

import useIncidentSocket from '../hooks/useIncidentSocket';
import { fetchRecentIncidents } from '../store/modules/incidents';

import ScreensRoot from '../screens/Root';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRecentIncidents());
  }, [dispatch]);

  useIncidentSocket();

  return <ScreensRoot />;
}

export default App;
