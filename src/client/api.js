export const recentIncidents = () => {
  const path = window.location.port ? '//localhost:3001' : '';
  return fetch(`${path}/api/recent`).then(response => response.json());
};
