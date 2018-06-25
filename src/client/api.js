const path = window.location.port ? '//localhost:3001' : '';

export const recentIncidents = () => {
  return fetch(`${path}/api/recent`).then(response => response.json());
};

export const incidentDetails = code => {
  return fetch(`${path}/api/incident/${code}`).then(response => response.json());
};
