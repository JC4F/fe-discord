import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IAuthenState {
  user: any; // object identify user
  status: "loading" | "none";
}

const initialState: IAuthenState = {
  user: null,
  status: "none",
};

export const loginAsync = createAsyncThunk(
  "authen/loginAsync",
  async (amount: number) => {
    // const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return null;
  },
);

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "none";
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "none";
        state.user = null;
      });
  },
});

export const { logout } = authenSlice.actions;
export default authenSlice.reducer;
