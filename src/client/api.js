export const fetchRecentIncidents = async () => {
  const path = window.location.port ? '//localhost:3001' : '';
  return await fetch(`${path}/recent`).then(response => response.json());
};
