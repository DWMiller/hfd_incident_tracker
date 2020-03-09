import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    zoom: 12,
    center: [43.254401, -79.863552],
    activeMarker: null,
  },
  reducers: {
    mapChange: (state, action) => ({ ...state, ...action.payload }),
    setActiveMarker: (state, action) => ({ ...state, activeMarker: action.payload }),
  },
});

export const { mapChange, setActiveMarker } = mapSlice.actions;

export default mapSlice.reducer;
