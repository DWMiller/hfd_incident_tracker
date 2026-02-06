import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addIncidents } from '../store/modules/incidents';

const socket = window.location.port ? io('//localhost:3001') : io();

export default function useIncidentSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = incident => {
      dispatch(addIncidents([incident]));
    };

    socket.on('incident', handler);
    return () => socket.off('incident', handler);
  }, [dispatch]);
}
