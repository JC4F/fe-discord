import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "utils";
import { IAuthenErrorResponse, IRegisterResponse } from "./type";

const initUser: IRegisterResponse = {
  userId: "",
  username: null,
  email: "",
  isVerified: false,
  accessToken: "",
};

export interface IAuthenState {
  user: IRegisterResponse; // object identify user
  status: "loading" | "none";
  errorMess: string;
}

const initialState: IAuthenState = {
  user: { ...initUser },
  status: "none",
  errorMess: "",
};

export const registerAsync = createAsyncThunk<
  IRegisterResponse, // Kiểu trả về khi fulfilled
  Record<string, any>, // Kiểu tham số truyền vào
  {
    rejectValue: IAuthenErrorResponse; // Kiểu trả về khi rejected với rejectWithValue
  }
>(
  "authen/registerAsync",
  async (submitData: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await http.post<IRegisterResponse>(
        "authen/register",
        submitData,
      );
      return response.data;
    } catch (error: any) {
      // if (!error.response) {
      //   throw error;
      // }
      return rejectWithValue(error.response.data as IAuthenErrorResponse);
    }
  },
);

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { ...initUser };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "none";
        state.errorMess = "";
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.user = { ...initUser };
        state.status = "none";
        state.errorMess = action.payload?.message ?? "Authe failed!";
      });
  },
});

export const { logout } = authenSlice.actions;
export default authenSlice.reducer;
