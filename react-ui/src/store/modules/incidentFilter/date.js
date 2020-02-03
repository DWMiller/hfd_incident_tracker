import { createSlice } from '@reduxjs/toolkit';

const filterDateSlice = createSlice({
  name: 'dateFilter',
  initialState: {
    min: 0,
    max: 24,
  },
  reducers: {
    setDateRange: {
      reducer: (state, action) => action.payload,
      prepare: payload => ({
        payload,
        meta: {
          debounce: {
            time: 100,
            leading: true,
            trailing: true,
          },
        },
      }),
    },
  },
});

export const { setDateRange } = filterDateSlice.actions;

export default filterDateSlice.reducer;
