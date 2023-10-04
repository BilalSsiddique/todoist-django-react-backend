import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface initialState {
  token: null | string;
  user: null | string;
}

const initialState: initialState = {
  token: null,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.username;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
    
  },
});

const { actions, reducer } = authSlice;
export const { setToken, clearToken } = actions;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export default reducer;
