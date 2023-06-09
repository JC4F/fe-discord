import React from "react";
import MainLayout from "share/molecules/main-layout";
import SearchChanelDialog from "share/dialog/search-chanel";
import { ReactComponent as FriendIcon } from "assest/svg/friend.svg";
import { ReactComponent as CreateGroupChatIcon } from "assest/svg/create-new-group-chat.svg";
import { ReactComponent as MailComingIcon } from "assest/svg/new-coming-mail.svg";
import { ReactComponent as NitroIcon } from "assest/svg/nitro.svg";
import { ReactComponent as BirthdayIcon } from "assest/svg/birthday.svg";
import { ReactComponent as AddIcon } from "assest/svg/add-svgrepo-com.svg";
import { ReactComponent as CloseIcon } from "assest/svg/close.svg";
import { ReactComponent as NoFriendIcon } from "assest/svg/no-friend.svg";
import { ReactComponent as SearchIcon } from "assest/svg/search.svg";
import { ReactComponent as MessageIcon } from "assest/svg/message.svg";
import { ReactComponent as OtherChoiceIcon } from "assest/svg/other-choice.svg";
import { ReactComponent as AcceptIcon } from "assest/svg/accept.svg";
import { ReactComponent as RemoveBlockIcon } from "assest/svg/remove-block.svg";
import MainButtonExpand from "share/atoms/main-button-expand";
import { IUserState } from "store/authen/type";
import IconStateWrapper from "share/atoms/icon-state-wrapper";
import IconToolTip from "share/atoms/icon-tooltip";
import { Button } from "@mui/material";
import CustomTooltipDialog from "share/atoms/custom-tooltip-dialog";
import styles from "./index.module.css";
import CreateGroupChat from "share/molecules/create-group-chat";

const NoFriend = () => {
  return (
    <div className={styles.noFriends}>
      <NoFriendIcon />
      <h2>Chả có ai chơi với Wumpus cả.</h2>
    </div>
  );
};

type IFriendChoosing = "ACTIVE" | "ALL" | "PENDING" | "BLOCKED" | "ADD-MORE";

type ITabsState = {
  [key in IFriendChoosing]: {
    search: string;
    isHavingUserList: boolean;
  };
};

interface IMeState {
  dialogOpen: boolean;
  friendChoosing: IFriendChoosing;
  tabsState: ITabsState;
  userList: IAllUser[];
}

const initMeState: IMeState = {
  dialogOpen: false,
  friendChoosing: "ACTIVE",
  tabsState: {
    ACTIVE: {
      search: "",
      isHavingUserList: false,
    },
    "ADD-MORE": {
      search: "",
      isHavingUserList: false,
    },
    ALL: {
      search: "",
      isHavingUserList: false,
    },
    BLOCKED: {
      search: "",
      isHavingUserList: false,
    },
    PENDING: {
      search: "",
      isHavingUserList: false,
    },
  },
  userList: [],
};

// fake data lấy từ context sau khi f5 hoặc login chẳng hạn, mảng all user
export interface IAllUser {
  userId: string;
  username: string;
  imageUrl: string;
  state: IUserState;
  extraInfo?: string;
}

const pendingBlockUsers: IAllUser[] = [
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
];

const allUsers: IAllUser[] = [
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
];

const friendActionState: IFriendChoosing[] = [
  "ACTIVE",
  "ALL",
  "PENDING",
  "BLOCKED",
  "ADD-MORE",
];

// Mấy state user này ở trong me, nên sẽ thực hiện request ở trong này
// socketio có thể gọi đến đây để thay đổi user
const Me: React.FC = () => {
  const [meState, setMeState] = React.useState<IMeState>(initMeState);

  React.useLayoutEffect(() => {
    let userList: IAllUser[] = [];
    if (meState.friendChoosing === "ACTIVE" || meState.friendChoosing === "ALL")
      userList = [...allUsers];
    else if (meState.friendChoosing === "BLOCKED")
      userList = [...pendingBlockUsers];
    else if (meState.friendChoosing === "PENDING")
      userList = [...pendingBlockUsers];

    setMeState((pre) => ({
      ...pre,
      userList,
      tabsState: {
        ...pre.tabsState,
        [meState.friendChoosing]: {
          ...pre.tabsState[meState.friendChoosing],
          isHavingUserList: userList.length > 0,
        },
      },
    }));
  }, [meState.friendChoosing]);

  const usersProcessing: IAllUser[] = React.useMemo(() => {
    let userListTemp: IAllUser[] = [];

    if (["ALL", "PENDING", "BLOCKED"].includes(meState.friendChoosing)) {
      userListTemp = [...meState.userList];
    } else if (meState.friendChoosing === "ACTIVE") {
      userListTemp = [...meState.userList].filter(
        (user) => user.state === "ACTIVE",
      );
    } else return userListTemp;

    return userListTemp.filter((user) =>
      user.username
        .toLowerCase()
        .includes(
          meState.tabsState[meState.friendChoosing].search.toLowerCase(),
        ),
    );
  }, [meState.userList, meState.tabsState]);

  const handleHeadDialogFind = React.useCallback((makeOpen: boolean) => {
    setMeState((pre) => ({
      ...pre,
      dialogOpen: makeOpen,
    }));
  }, []);

  const handleChangeFriendChoosing = React.useCallback(
    (item: IFriendChoosing) => {
      setMeState((pre) => ({
        ...pre,
        friendChoosing: item,
      }));
    },
    [],
  );

  const getFriendText = React.useCallback((friendChoosing: IFriendChoosing) => {
    switch (friendChoosing) {
      case "ACTIVE":
        return "Trực tuyến";
      case "ALL":
        return "Tất cả";
      case "BLOCKED":
        return "Đã chặn";
      case "ADD-MORE":
        return "Thêm bạn";
      case "PENDING":
        return "Đang chờ xử lí";
      default:
        return "";
    }
  }, []);

  const handleOnChangeSearch = React.useCallback(
    (choosingState: IFriendChoosing, value: string) => {
      setMeState((pre) => ({
        ...pre,
        tabsState: {
          ...pre.tabsState,
          [choosingState]: {
            ...pre.tabsState[choosingState],
            search: value,
          },
        },
      }));
    },
    [],
  );

  const handleCloseSearch = React.useCallback(
    (choosingState: IFriendChoosing) => {
      setMeState((pre) => ({
        ...pre,
        tabsState: {
          ...pre.tabsState,
          [choosingState]: {
            ...pre.tabsState[choosingState],
            search: "",
          },
        },
      }));
    },
    [],
  );

  const getIconListExpandButton = React.useCallback(
    (choosingState: IFriendChoosing) => {
      if (choosingState === "PENDING")
        return [
          {
            Icon: <IconToolTip Icon={<AcceptIcon />} title={"Chấp nhận"} />,
            isShownOnHover: false,
          },
          {
            Icon: <IconToolTip Icon={<CloseIcon />} title={"Bỏ qua"} />,
            isShownOnHover: false,
          },
        ];
      else if (choosingState === "BLOCKED")
        return [
          {
            Icon: (
              <IconToolTip Icon={<RemoveBlockIcon />} title={"Chấp nhận"} />
            ),
            isShownOnHover: false,
          },
        ];
      else
        return [
          {
            Icon: <IconToolTip Icon={<MessageIcon />} title={"Nhắn tin"} />,
            isShownOnHover: false,
          },
          {
            Icon: (
              <IconToolTip
                Icon={<OtherChoiceIcon />}
                title={"Những mục khác"}
              />
            ),
            isShownOnHover: false,
          },
        ];
    },
    [],
  );

  return (
    <>
      <MainLayout
        NextHeadEle={
          <button
            onClick={() => handleHeadDialogFind(true)}
            className={styles.customButtonHeadd}
          >
            Tìm hoặc bắt đầu một cuộc trò chuyện
          </button>
        }
        NextContentEle={
          <>
            <MainButtonExpand
              mainButtonProps={{
                buttonSize: "SMALL",
                iconList: [{ Icon: <FriendIcon />, iconPosition: "CENTER" }],
              }}
              des={{ representName: "Bạn bè" }}
              onClick={() => {
                console.log(99);
              }}
              iconList={[
                {
                  Icon: (
                    <div className={styles.haveNotify}>
                      {pendingBlockUsers.length}
                    </div>
                  ),
                  isShownOnHover: false,
                },
              ]}
              isButtonChoosen={true}
            />
            <MainButtonExpand
              mainButtonProps={{
                buttonSize: "SMALL",
                iconList: [{ Icon: <NitroIcon />, iconPosition: "CENTER" }],
              }}
              des={{ representName: "Nitro" }}
            />
            <MainButtonExpand
              mainButtonProps={{
                buttonSize: "SMALL",
                iconList: [
                  {
                    Icon: (
                      <BirthdayIcon
                        style={{ color: "var(--discord-8th-bday-yellow)" }}
                      />
                    ),
                    iconPosition: "CENTER",
                  },
                ],
              }}
              des={{ representName: "Sinh Nhật Discord" }}
            />
            {/* sau check dk hien thi neu co friend */}
            <h2 className={styles.directMessage}>
              <span>TIN NHẮN TRỰC TIẾP</span>
              <CustomTooltipDialog
                dialogContent={<CreateGroupChat />}
                tooltipContent={<AddIcon />}
                tooltipProps={{
                  placement: "bottom-start",
                }}
                nestTitle="Tạo DM"
                nestPlacement="top"
              />
            </h2>

            {allUsers.length > 0 &&
              allUsers.map((user) => (
                <MainButtonExpand
                  key={user.userId}
                  mainButtonProps={{
                    imageUrl: user.imageUrl,
                    buttonSize: "SMALL",
                    iconList: [
                      {
                        Icon: <IconStateWrapper state={user.state} />,
                        iconPosition: "BOTTOM-RIGHT",
                      },
                    ],
                  }}
                  des={{
                    representName: user.username,
                    extraInfo: user.extraInfo,
                  }}
                  iconList={[
                    {
                      Icon: <CloseIcon />,
                      isShownOnHover: true,
                    },
                  ]}
                  onClick={() => console.log(user.userId)}
                />
              ))}
          </>
        }
        MainHeadEle={
          <>
            <div className={styles.friendWrapper}>
              <FriendIcon />
              <h1 className={styles.startTitle}>Bạn bè</h1>
              <div className={styles.seperate}></div>
              <div className={styles.friendActionState}>
                {friendActionState.map((item: IFriendChoosing) => {
                  if (item === "PENDING") {
                    return (
                      <div
                        key={item}
                        className={
                          item === meState.friendChoosing
                            ? `${styles.friendState} ${styles.friendChoosed}`
                            : styles.friendState
                        }
                        onClick={() => handleChangeFriendChoosing(item)}
                      >
                        {getFriendText(item)}
                        {pendingBlockUsers.length > 0 && (
                          <div className={styles.haveNotify}>
                            {pendingBlockUsers.length}
                          </div>
                        )}
                      </div>
                    );
                  } else if (item === "ADD-MORE") {
                    return (
                      <div
                        key={item}
                        className={
                          item === meState.friendChoosing
                            ? `${styles.friendState} ${styles.friendActionChoosed}`
                            : styles.friendAction
                        }
                        onClick={() => handleChangeFriendChoosing(item)}
                      >
                        {getFriendText(item)}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={item}
                      className={
                        item === meState.friendChoosing
                          ? `${styles.friendState} ${styles.friendChoosed}`
                          : styles.friendState
                      }
                      onClick={() => handleChangeFriendChoosing(item)}
                    >
                      {getFriendText(item)}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.notifyWrapper}>
              <div className={styles.createGroupChat}>
                <CustomTooltipDialog
                  dialogContent={<CreateGroupChat />}
                  tooltipContent={<CreateGroupChatIcon />}
                  tooltipProps={{
                    placement: "bottom-end",
                  }}
                  nestTitle="Nhóm danh mục mới"
                  nestPlacement="bottom"
                />
              </div>
              <div className={styles.mailComing}>
                <MailComingIcon />
              </div>
            </div>
          </>
        }
        MainContentEle={
          <>
            <div className={styles.mainContentLeft}>
              {meState.friendChoosing === "ADD-MORE" && (
                <>
                  <div className={styles.addFriendWrapper}>
                    <h2>Thêm bạn</h2>
                    <span>
                      Bạn có thể thêm bạn bè bằng tên người dùng Discord của họ.
                    </span>
                    <div className={styles.inputAddFriendWrapper}>
                      <div className={styles.inputWrapper}>
                        <input
                          type="text"
                          className={styles.inputAddFriend}
                          placeholder="Bạn có thể thêm bạn bè bằng tên người dùng Discord của họ."
                          value={
                            meState.tabsState[meState.friendChoosing].search
                          }
                          onChange={(e) =>
                            handleOnChangeSearch(
                              meState.friendChoosing,
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <Button
                        variant="contained"
                        disabled={
                          meState.tabsState[meState.friendChoosing].search ===
                          ""
                        }
                        sx={{
                          "&.Mui-disabled": {
                            backgroundColor: "var(--brand-experiment)",
                            color: "var(--white-500)",
                            cursor: "not-allowed",
                            opacity: "0.5",
                          },
                          "&.MuiButton-label": {
                            fontSize: "14px",
                          },
                        }}
                      >
                        Gửi Yêu Cầu Kết Bạn
                      </Button>
                    </div>
                  </div>
                  <div className={styles.emptyState}>
                    <NoFriend />
                  </div>
                </>
              )}
              {meState.friendChoosing !== "ADD-MORE" && (
                <>
                  {!meState.tabsState[meState.friendChoosing]
                    .isHavingUserList && <NoFriend />}
                  {meState.tabsState[meState.friendChoosing]
                    .isHavingUserList && (
                    <>
                      <div className={styles.inputSearchWrapper}>
                        <input
                          className={styles.input}
                          type="text"
                          placeholder="Tìm kiếm"
                          value={
                            meState.tabsState[meState.friendChoosing].search
                          }
                          onChange={(e) =>
                            handleOnChangeSearch(
                              meState.friendChoosing,
                              e.target.value,
                            )
                          }
                        />
                        {meState.tabsState[meState.friendChoosing].search ===
                        "" ? (
                          <SearchIcon />
                        ) : (
                          <div
                            className={styles.iconWrapper}
                            onClick={() =>
                              handleCloseSearch(meState.friendChoosing)
                            }
                          >
                            <CloseIcon />
                          </div>
                        )}
                      </div>
                      <div className={styles.titleWrapper}>
                        <h2 className={styles.title}>
                          Tất cả bạn bè - {usersProcessing.length}
                        </h2>
                      </div>
                      <div className={styles.friendListWrapper}>
                        {usersProcessing.length === 0 && <NoFriend />}
                        {usersProcessing.length > 0 &&
                          usersProcessing.map((item) => (
                            <div
                              key={item.userId}
                              className={styles.friendList}
                            >
                              <MainButtonExpand
                                mainButtonProps={{
                                  buttonSize: "SMALL",
                                  imageUrl: item.imageUrl,
                                  iconList: [
                                    {
                                      Icon: (
                                        <IconStateWrapper state={item.state} />
                                      ),
                                      iconPosition: "BOTTOM-RIGHT",
                                    },
                                  ],
                                }}
                                des={{
                                  representName: item.username,
                                  extraInfo: item.extraInfo,
                                }}
                                iconList={getIconListExpandButton(
                                  meState.friendChoosing,
                                )}
                              />
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className={styles.mainContentRight}>
              <h2>Đang Hoạt Động</h2>
              <div className={styles.activeUsers}>
                <h4>Hiện tại không có cập nhật mới nào cả…</h4>
                <span>
                  Nếu bạn bè của bạn có hoạt động mới, ví dụ như chơi game hoặc
                  trò chuyện thoại, chúng tôi sẽ hiển thị hoạt động đó ở đây!
                </span>
              </div>
            </div>
          </>
        }
      />
      <SearchChanelDialog
        isOpen={meState.dialogOpen}
        handleCloseDialog={handleHeadDialogFind}
      />
    </>
  );
};

export default Me;
