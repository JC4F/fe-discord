import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAndParseItemFromLocalStorage, http } from "utils";
import {
  IAuthenErrorResponse,
  IAuthenResponse,
  IAuthenSyncParams,
} from "./type";

const initUser: IAuthenResponse = {
  userId: "",
  username: null,
  email: "",
  isVerified: false,
  accessToken: "",
};

export interface IAuthenState {
  user: IAuthenResponse; // object identify user
  status: "loading" | "none";
  errorMess: string;
}

const initialState: IAuthenState = {
  user: getAndParseItemFromLocalStorage("userData") || { ...initUser },
  status: "none",
  errorMess: "",
};

export const authenAsync = createAsyncThunk<
  IAuthenResponse, // Kiểu trả về khi fulfilled
  IAuthenSyncParams, // Kiểu tham số truyền vào
  {
    rejectValue: IAuthenErrorResponse; // Kiểu trả về khi rejected với rejectWithValue
    // extra: IExtraAuthenParams; // Tham số custom
  }
>("authen/authenAsync", async (payload, { rejectWithValue }) => {
  const { type, submitData } = payload;
  const postUrl = type === "LOGIN" ? "authen/login" : "authen/register";

  try {
    const response = await http.post<IAuthenResponse>(postUrl, submitData);

    localStorage.setItem("userData", JSON.stringify(response.data));

    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data as IAuthenErrorResponse);
  }
});

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    authenFromLocalStorage: (state, action) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.user = { ...initUser };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "none";
        state.errorMess = "";
      })
      .addCase(authenAsync.rejected, (state, action) => {
        state.user = { ...initUser };
        state.status = "none";
        state.errorMess = action.payload?.message ?? "Authen failed!";
      });
  },
});

export const { logout, authenFromLocalStorage } = authenSlice.actions;
export default authenSlice.reducer;
