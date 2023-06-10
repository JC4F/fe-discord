import { createSlice } from "@reduxjs/toolkit";

export type ISubChanelType = "AUDIO" | "TEXT" | "EVENT";

export interface ISubChanel {
  subChanelId: string;
  subChanelName: string;
  typeSubChanel: ISubChanelType;
}

export interface ISubChanelGroup {
  subChanelGroupId: string;
  subChanelGroupName: string;
  listSubChanel: ISubChanel[];
  choosingSubChanelId: string;
}

export interface IChanelItem {
  chanelId: string;
  chanelName: string;
  imageUrl: string;
  numNotify: number;
  isEventing: boolean;
  subChanelGroup: ISubChanelGroup[];
}

interface IFriendState {
  chanelList: IChanelItem[];
  choosingChanelId: string;
}

const initialState: IFriendState = {
  chanelList: [
    {
      chanelId: "c_1",
      chanelName: "Chanel 1",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXWb33xF2woHnPawT6SffqyIkHkqUr62Vtg&usqp=CAU",
      isEventing: true,
      numNotify: 3,
      subChanelGroup: [
        {
          subChanelGroupId: "sbg_1",
          subChanelGroupName: "Thong tin",
          listSubChanel: [
            {
              subChanelId: "sb_1",
              subChanelName: "Sub chanel 1",
              typeSubChanel: "TEXT",
            },
            {
              subChanelId: "sb_2",
              subChanelName: "Sub chanel 2",
              typeSubChanel: "TEXT",
            },
          ],
          choosingSubChanelId: "sb_1",
        },
        {
          subChanelGroupId: "sbg_2",
          subChanelGroupName: "Thong tin",
          listSubChanel: [
            {
              subChanelId: "sb_3",
              subChanelName: "Sub chanel 3",
              typeSubChanel: "TEXT",
            },
            {
              subChanelId: "sb_4",
              subChanelName: "Sub chanel 4",
              typeSubChanel: "AUDIO",
            },
          ],
          choosingSubChanelId: "sb_1",
        },
      ],
    },
    {
      chanelId: "c_2",
      chanelName: "Chanel 2",
      imageUrl: "",
      isEventing: false,
      numNotify: 0,
      subChanelGroup: [
        {
          subChanelGroupId: "sbg_3",
          subChanelGroupName: "Thong tin",
          listSubChanel: [
            {
              subChanelId: "sb_5",
              subChanelName: "Sub chanel 1",
              typeSubChanel: "TEXT",
            },
            {
              subChanelId: "sb_6",
              subChanelName: "Sub chanel 2",
              typeSubChanel: "TEXT",
            },
          ],
          choosingSubChanelId: "sb_1",
        },
        {
          subChanelGroupId: "sbg_4",
          subChanelGroupName: "Thong tin",
          listSubChanel: [
            {
              subChanelId: "sb_7",
              subChanelName: "Sub chanel 3",
              typeSubChanel: "EVENT",
            },
            {
              subChanelId: "sb_8",
              subChanelName: "Sub chanel 4",
              typeSubChanel: "TEXT",
            },
          ],
          choosingSubChanelId: "sb_1",
        },
      ],
    },
  ],
  choosingChanelId: "",
};

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    // lấy result từ api rồi dispatch lên
    updateChoosingChanelId: (state, action) => {
      state.choosingChanelId = action.payload.choosingChanelId;
    },
    addNewChanels: (state, action) => {},
    removeChanels: (state, action) => {},
    addNewSubChanelGroupChanels: (state, action) => {},
    removeSubChanelGroupChanels: (state, action) => {},
    addNewSubChanelChanels: (state, action) => {},
    removeSubChanelChanels: (state, action) => {},
  },
  extraReducers: (builder) => {},
});

export const {
  addNewChanels,
  removeChanels,
  addNewSubChanelChanels,
  removeSubChanelGroupChanels,
  addNewSubChanelGroupChanels,
  removeSubChanelChanels,
  updateChoosingChanelId,
} = friendSlice.actions;
export default friendSlice.reducer;
