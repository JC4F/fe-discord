import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import authenReducer from "./authen";

export const store = configureStore({
  reducer: {
    authen: authenReducer,
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
