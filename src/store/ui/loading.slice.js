import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shown: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading(state) {
      state.shown = true;
    },

    hideLoading(state) {
      state.shown = false;
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
