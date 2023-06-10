import { createSlice } from "@reduxjs/toolkit";

export type IChanelType = "AUDIO" | "TEXT" | "EVENT";

export interface IChanel {
  chanelId: string;
  chanelName: string;
  chanelType: IChanelType;
}

export interface IDirectoryChanel {
  directoryChanelId: string;
  directoryChanelName: string; // "DEFAULT" || "" => để hiện thị Chanel ra ngoài
  chanelList: IChanel[];
  choosingChanelId: string;
}

export interface IServerItem {
  serverId: string;
  serverName: string;
  hostName: string;
  hostId: string;
  imageUrl: string;
  numNotify: number;
  isEventing: boolean;
  directoryChanelList: IDirectoryChanel[];
}

interface IServerState {
  serverList: IServerItem[];
  choosingServerId: string;
}

const initialState: IServerState = {
  serverList: [
    {
      serverId: "c_1",
      serverName: "Chanel 1",
      hostName: "Yasuo",
      hostId: "1",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXWb33xF2woHnPawT6SffqyIkHkqUr62Vtg&usqp=CAU",
      isEventing: true,
      numNotify: 3,
      directoryChanelList: [
        {
          directoryChanelId: "sbg_1",
          directoryChanelName: "Thong tin",
          chanelList: [
            {
              chanelId: "sb_1",
              chanelName: "Sub chanel 1",
              chanelType: "TEXT",
            },
            {
              chanelId: "sb_2",
              chanelName: "Sub chanel 2",
              chanelType: "TEXT",
            },
          ],
          choosingChanelId: "sb_1",
        },
        {
          directoryChanelId: "sbg_2",
          directoryChanelName: "Thong tin",
          chanelList: [
            {
              chanelId: "sb_3",
              chanelName: "Sub chanel 3",
              chanelType: "TEXT",
            },
            {
              chanelId: "sb_4",
              chanelName: "Sub chanel 4",
              chanelType: "AUDIO",
            },
          ],
          choosingChanelId: "sb_1",
        },
      ],
    },
    {
      serverId: "c_2",
      serverName: "",
      hostName: "Yone",
      hostId: "2",
      imageUrl: "",
      isEventing: false,
      numNotify: 0,
      directoryChanelList: [
        {
          directoryChanelId: "sbg_3",
          directoryChanelName: "Thong tin",
          chanelList: [
            {
              chanelId: "sb_5",
              chanelName: "Sub chanel 1",
              chanelType: "TEXT",
            },
            {
              chanelId: "sb_6",
              chanelName: "Sub chanel 2",
              chanelType: "TEXT",
            },
          ],
          choosingChanelId: "sb_1",
        },
        {
          directoryChanelId: "sbg_4",
          directoryChanelName: "Thong tin",
          chanelList: [
            {
              chanelId: "sb_7",
              chanelName: "Sub chanel 3",
              chanelType: "EVENT",
            },
            {
              chanelId: "sb_8",
              chanelName: "Sub chanel 4",
              chanelType: "TEXT",
            },
          ],
          choosingChanelId: "sb_1",
        },
      ],
    },
  ],
  choosingServerId: "",
};

export const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    // lấy result từ api rồi dispatch lên
    updatechoosingServerId: (state, action) => {
      state.choosingServerId = action.payload.choosingServerId;
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
  updatechoosingServerId,
} = serverSlice.actions;
export default serverSlice.reducer;
