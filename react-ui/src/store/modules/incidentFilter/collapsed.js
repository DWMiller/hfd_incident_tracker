import { createSlice } from '@reduxjs/toolkit';

const filterCollapseSlice = createSlice({
  name: 'filter',
  initialState: false,
  reducers: {
    toggleFilterCollapse: state => !state,
  },
});

export const { toggleFilterCollapse } = filterCollapseSlice.actions;

export default filterCollapseSlice.reducer;
