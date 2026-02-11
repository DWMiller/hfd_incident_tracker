import React from 'react';
import { useDispatch } from 'react-redux';

import useIncidentPolling from '../hooks/useIncidentPolling';
import { fetchRecentIncidents } from '../store/modules/incidents';

import AppRoutes from '../screens/AppRoutes';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRecentIncidents());
  }, [dispatch]);

  useIncidentPolling();

  return <AppRoutes />;
}

export default App;
