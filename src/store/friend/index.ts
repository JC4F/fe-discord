import { createSlice } from "@reduxjs/toolkit";

export type IUserState = "ACTIVE" | "INACTIVE" | "BUSY" | "WAIT" | "NONE";

export interface IUser {
  userId: string;
  username: string;
  imageUrl: string;
  state: IUserState;
  extraInfo?: string;
}

export interface IFriendState {
  friendList: IUser[];
  pendingUsers: IUser[];
  blockingUsers: IUser[];
}

const initialState: IFriendState = {
  friendList: [
    {
      userId: "1",
      username: "Quan",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "ACTIVE",
      extraInfo: "PLay Lol",
    },
    {
      userId: "2",
      username: "Quan1",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "BUSY",
      extraInfo: "PLay Lol1",
    },
    {
      userId: "3",
      username: "Quan2",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "ACTIVE",
      extraInfo: "PLay Lol2",
    },
    {
      userId: "4",
      username: "Quan",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "WAIT",
      extraInfo: "PLay Lol3",
    },
    {
      userId: "5",
      username: "Long",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "WAIT",
      extraInfo: "PLay Lol3",
    },
    {
      userId: "6",
      username: "Khoa",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "WAIT",
      extraInfo: "PLay Lol3",
    },
    {
      userId: "7",
      username: "Hoang",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "WAIT",
      extraInfo: "PLay Lol3",
    },
  ],
  pendingUsers: [
    {
      userId: "1",
      username: "Quan",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "NONE",
    },
    {
      userId: "2",
      username: "Quan222",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "NONE",
    },
  ],
  blockingUsers: [
    {
      userId: "1",
      username: "Quan",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "NONE",
    },
    {
      userId: "2",
      username: "Quan222",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
      state: "NONE",
    },
  ],
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    acceptPendingUser: (state, action) => {
      const newFriend = state.pendingUsers.find(
        (user) => user.userId === action.payload.userId,
      );
      if (newFriend) state.friendList = [...state.friendList, newFriend];
    },
    removePendingUser: (state, action) => {
      const newPendingUser = state.pendingUsers.filter(
        (user) => user.userId !== action.payload.userId,
      );
      state.pendingUsers = [...newPendingUser];
    },
    removeFriend: (state, action) => {
      const newFriendList = state.friendList.filter(
        (user) => user.userId !== action.payload.userId,
      );
      state.friendList = [...newFriendList];
    },
    removeBlockingUser: (state, action) => {
      const newFriend = state.blockingUsers.find(
        (user) => user.userId === action.payload.userId,
      );
      if (newFriend) state.friendList = [...state.friendList, newFriend];

      state.blockingUsers = [...state.blockingUsers].filter(
        (user) => user.userId !== action.payload.userId,
      );
    },
  },
  extraReducers: (builder) => {},
});

export const {
  acceptPendingUser,
  removePendingUser,
  removeFriend,
  removeBlockingUser,
} = friendSlice.actions;
export default friendSlice.reducer;
