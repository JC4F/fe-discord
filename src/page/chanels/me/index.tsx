import React from "react";
import MainLayout from "share/molecules/main-layout";
import SearchChanelDialog from "share/dialog/search-chanel";
import { ReactComponent as FriendIcon } from "assest/svg/friend.svg";
import { ReactComponent as CreateGroupChatIcon } from "assest/svg/create-new-group-chat.svg";
import { ReactComponent as MailComingIcon } from "assest/svg/new-coming-mail.svg";
import styles from "./index.module.css";

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
        NextContentEle={<div>next-content</div>}
        MainHeadEle={
          <>
            <div className={styles.friendWrapper}>
              <FriendIcon />
              <h1 className={styles.startTitle}>Bạn bè</h1>
              <div className={styles.seperate}></div>
              {friendActionState.map(
                (item: Exclude<IFriendChoosing, "NONE">) => {
                  if (item === "PENDING") {
                    return (
                      <div
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
                      <div className={styles.friendAction}>
                        {getFriendText(item)}
                      </div>
                    );
                  }
                  return (
                    <div className={styles.friendState}>
                      {getFriendText(item)}
                    </div>
                  );
                },
              )}
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
