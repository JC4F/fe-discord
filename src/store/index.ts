import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authenReducer from "./authen";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
