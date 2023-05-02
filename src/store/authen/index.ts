import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "utils";
import { IRegisterResponse } from "./type";

interface IUser {
  accessToken: string;
}

export interface IAuthenState {
  user: IUser; // object identify user
  status: "loading" | "none";
}

const initialState: IAuthenState = {
  user: { accessToken: "" },
  status: "none",
};

export const loginAsync = createAsyncThunk(
  "authen/loginAsync",
  async (submitData: Record<string, any>) => {
    const response = await http.post<IRegisterResponse>(
      "authen/register",
      submitData,
    );
    // handle response

    return response.data;
  },
);

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { accessToken: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "none";
        state.user.accessToken = action.payload.accessToken;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "none";
        state.user = { accessToken: "" };
      });
  },
});

export const { logout } = authenSlice.actions;
export default authenSlice.reducer;
