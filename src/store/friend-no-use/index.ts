import { createSlice } from "@reduxjs/toolkit";

export interface IFriendState {}

const initialState: IFriendState = {};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = friendSlice.actions;
export default friendSlice.reducer;
