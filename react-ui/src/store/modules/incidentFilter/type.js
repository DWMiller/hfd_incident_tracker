import { createSlice } from '@reduxjs/toolkit';

import icons from '../../../config/icons';

// Simple array of strings to enable all filters by default
const initialState = Object.keys(icons).map(key => key);

const typeFilterSlice = createSlice({
  name: 'typeFilter',
  initialState,
  reducers: {
    filterTypeToggled: (state, { payload }) => {
      const isActive = state.findIndex(t => t === payload.category);
      if (isActive === -1) {
        return [...state, payload.category];
      }
      return [...state.slice(0, isActive), ...state.slice(isActive + 1)];
    },
    allFilterTypesDeselected: () => [],
    multipleFilterTypesSelected: (state, { payload }) => [...payload.category],
  },
});

export const {
  filterTypeToggled,
  allFilterTypesDeselected,
  multipleFilterTypesSelected,
} = typeFilterSlice.actions;

export default typeFilterSlice.reducer;
