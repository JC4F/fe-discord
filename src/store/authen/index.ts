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
  dob: "",
  imageUrl: "",
  joinDate: "",
  phone: null,
};

export interface IAuthenState {
  user: IAuthenResponse; // object identify user
  status: "LOADING" | "NONE";
  errorMess: string;
}

const initialState: IAuthenState = {
  user: getAndParseItemFromLocalStorage("userData") || { ...initUser },
  status: "NONE",
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
  let postUrl = "";

  switch (type) {
    case "REGISTER":
      postUrl = "authen/register";
      break;
    case "LOGIN":
      postUrl = "authen/login";
      break;
    case "SSO_GOOGLE":
      postUrl = "authen/profile";
      break;
    case "SSO_FACEBOOK":
      postUrl = "authen/profile";
      break;
  }

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

export const logoutAsync = createAsyncThunk("logout/logoutAsync", () => {
  void http.get("authen/logout");
  // clear 1 cai thoi because sau con settings cac thu ?
  localStorage.removeItem("userData");
});

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    removeErrorMess: (state) => {
      state.errorMess = "";
    },
    authenWithUserDataPayload: (state, action) => {
      localStorage.setItem("userData", JSON.stringify({ ...action.payload }));
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.user = { ...initUser };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenAsync.pending, (state) => {
        state.status = "LOADING";
        state.errorMess = "";
      })
      .addCase(authenAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "NONE";
        state.errorMess = "";
      })
      .addCase(authenAsync.rejected, (state, action) => {
        state.user = { ...initUser };
        state.status = "NONE";
        state.errorMess = action.payload?.message ?? "Authen failed!";
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.user = { ...initUser };
        state.status = "NONE";
        state.errorMess = "";
      });
  },
});

export const { logout, authenWithUserDataPayload, removeErrorMess } =
  authenSlice.actions;
export default authenSlice.reducer;
