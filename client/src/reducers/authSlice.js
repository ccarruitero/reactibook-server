import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setAuth(state, action) {
      const { token } = action.payload;
      state.token = token;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
