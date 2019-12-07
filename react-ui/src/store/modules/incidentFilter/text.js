import { createSlice } from '@reduxjs/toolkit';

const textFilterSlice = createSlice({
  name: 'textFilter',
  initialState: '',
  reducers: {
    textFilterChanged: (state, { payload }) => payload.text,
  },
});

export const { textFilterChanged } = textFilterSlice.actions;

export default textFilterSlice.reducer;
