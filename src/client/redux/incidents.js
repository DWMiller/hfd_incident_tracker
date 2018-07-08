export const ADD_INCIDENTS = '[incidents] ADD';
export const CLEAR_INCIDENTS = '[incidents] CLEAR';
export const REPLACE_INCIDENTS = '[incidents] REPLACE';

export const addIncidents = incidents => ({
  type: ADD_INCIDENTS,
  incidents,
});

export const addIncident = incident => addIncidents([incident]);

export const replaceIncidents = incidents => ({
  type: REPLACE_INCIDENTS,
  incidents,
});

export const clearIncidents = () => ({
  type: CLEAR_INCIDENTS,
});

export default function reducer(state = [], { type, incidents } = {}) {
  switch (type) {
    case ADD_INCIDENTS:
      return [...incidents, ...state];
    case REPLACE_INCIDENTS:
      return [...incidents];
    case CLEAR_INCIDENTS:
      return [];
    default:
      return state;
  }
}
