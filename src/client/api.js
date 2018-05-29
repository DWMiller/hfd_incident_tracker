export const fetchRecentIncidents = async () => {
  const path = window.location.port ? '//localhost:3001' : '';
  return await fetch(`${path}/api/recent`).then(response => response.json());
};
