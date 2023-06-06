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
import MainButtonExpand from "share/atoms/main-button-expand";
import { IUserState } from "store/authen/type";
import styles from "./index.module.css";
import IconStateWrapper from "share/atoms/icon-state-wrapper";

type IFriendChoosing =
  | "NONE"
  | "ACTIVE"
  | "ALL"
  | "PENDING"
  | "BLOCKED"
  | "ADD-MORE";

interface IMeState {
  dialogOpen: boolean;
  friendChoosing: IFriendChoosing;
}

const initMeState: IMeState = {
  dialogOpen: false,
  friendChoosing: "NONE",
};

// fake data lấy từ context sau khi f5 hoặc login chẳng hạn, mảng các user pending
interface IPendingUser {
  userId: string;
  username: string;
  imageUrl: string;
}

// fake data lấy từ context sau khi f5 hoặc login chẳng hạn, mảng all user
interface IAllUser {
  userId: string;
  username: string;
  imageUrl: string;
  state: IUserState;
  extraInfo?: string;
}

const pendingUsers: IPendingUser[] = [
  {
    userId: "1",
    username: "Quan",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
  },
  {
    userId: "2",
    username: "Quan222",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBqDiLJS8JtdilSrSns8zFI1OSCnnmZmY4m-JJ2BKN&s",
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
    state: "INACTIVE",
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

const friendActionState: Array<Exclude<IFriendChoosing, "NONE">> = [
  "ACTIVE",
  "ALL",
  "PENDING",
  "BLOCKED",
  "ADD-MORE",
];

const Me: React.FC = () => {
  const [meState, setMeState] = React.useState<IMeState>(initMeState);

  const handleHeadDialogFind = React.useCallback((makeOpen: boolean) => {
    setMeState((pre) => ({
      ...pre,
      dialogOpen: makeOpen,
    }));
  }, []);

  const getFriendText = React.useCallback(
    (friendChoosing: Exclude<IFriendChoosing, "NONE">) => {
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
                      {pendingUsers.length}
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
              <AddIcon />
            </h2>

            {allUsers.length > 0 &&
              allUsers.map((item) => (
                <MainButtonExpand
                  key={item.userId}
                  mainButtonProps={{
                    imageUrl: item.imageUrl,
                    buttonSize: "SMALL",
                    iconList: [
                      {
                        Icon: <IconStateWrapper state={item.state} />,
                        iconPosition: "BOTTOM-RIGHT",
                      },
                    ],
                  }}
                  des={{
                    representName: item.username,
                    extraInfo: item.extraInfo,
                  }}
                  iconList={[
                    {
                      Icon: <CloseIcon />,
                      isShownOnHover: true,
                    },
                  ]}
                  onClick={() => console.log(item.userId)}
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
                {friendActionState.map(
                  (item: Exclude<IFriendChoosing, "NONE">) => {
                    if (item === "PENDING") {
                      return (
                        <div
                          key={item}
                          className={`${styles.friendState} ${styles.friendChoosed}`}
                        >
                          {getFriendText(item)}
                          {pendingUsers.length > 0 && (
                            <div className={styles.haveNotify}>
                              {pendingUsers.length}
                            </div>
                          )}
                        </div>
                      );
                    } else if (item === "ADD-MORE") {
                      return (
                        <div key={item} className={styles.friendAction}>
                          {getFriendText(item)}
                        </div>
                      );
                    }
                    return (
                      <div key={item} className={styles.friendState}>
                        {getFriendText(item)}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
            <div className={styles.notifyWrapper}>
              <div className={styles.createGroupChat}>
                <CreateGroupChatIcon />
              </div>
              <div className={styles.mailComing}>
                <MailComingIcon />
              </div>
            </div>
          </>
        }
        MainContentEle={<div>main-content</div>}
      />
      <SearchChanelDialog
        isOpen={meState.dialogOpen}
        handleCloseDialog={handleHeadDialogFind}
      />
    </>
  );
};

export default Me;
