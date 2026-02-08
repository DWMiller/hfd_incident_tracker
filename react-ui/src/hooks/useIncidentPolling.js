import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecentIncidents } from '../store/modules/incidents';

const POLL_INTERVAL = 30000;

export default function useIncidentPolling() {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(() => {
      dispatch(fetchRecentIncidents());
    }, POLL_INTERVAL);

    return () => clearInterval(id);
  }, [dispatch]);
}
