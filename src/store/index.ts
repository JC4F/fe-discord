import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import authenReducer from "./authen";
import chanelReducer from "./chanel";
import friendReducer from "./friend";

export const store = configureStore({
  reducer: {
    authen: authenReducer,
    chanel: chanelReducer,
    friend: friendReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
