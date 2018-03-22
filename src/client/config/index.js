import icons from './../config/icons';

export const apiKey = 'AIzaSyBDX9TpI_4wnD1Q-JVmLjfhc9B-vPgwc0Y';
export const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`;

export const initialState = {
  events: [],
  filters: {
    text: '',
    types: Object.keys(icons).map(key => key),
  },
  eventPanel: { active: null, isVisible: false },
  map: {
    zoom: 12,
    center: { lat: 43.254401, lng: -79.863552 },
  },
};
