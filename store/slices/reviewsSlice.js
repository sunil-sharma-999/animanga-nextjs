import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    currentItemReviews: [],
    myreview: '',
  },
  reducers: {
    addCurrentReview(state, action) {
      state.currentItemReviews = action.payload;
    },
    addMyreview(state, action) {
      state.myreview = action.payload;
    },
  },
});

export default reviewSlice.reducer;
export const { addCurrentReview, addMyreview } = reviewSlice.actions;
