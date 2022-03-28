import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    checkAuth(state, action) {
      return action.payload;
    },
    logout(state) {},
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
