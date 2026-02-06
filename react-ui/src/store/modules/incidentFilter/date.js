import { createSlice } from '@reduxjs/toolkit';

// Slider uses hours. 0 = now, 168 = 7 days ago. Default: last 24h.
const filterDateSlice = createSlice({
  name: 'dateFilter',
  initialState: {
    min: 0,
    max: 24,
  },
  reducers: {
    setDateRange: (state, action) => action.payload,
  },
});

export const { setDateRange } = filterDateSlice.actions;

export default filterDateSlice.reducer;
