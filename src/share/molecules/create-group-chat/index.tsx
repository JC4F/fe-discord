import React from "react";
import { Button } from "@mui/material";
import MainButtonExpand from "share/atoms/main-button-expand";
import IconStateWrapper from "share/atoms/icon-state-wrapper";
import { ReactComponent as CheckIcon } from "assest/svg/check.svg";
import { ReactComponent as SearchNoResultIcon } from "assest/svg/search-no-result.svg";
import { ReactComponent as CloseIcon } from "assest/svg/close.svg";
import { useRefManager } from "hooks";
import { useAppSelector } from "store/hooks";
import { IUser } from "store/friend";
import styles from "./index.module.css";

interface ICreateGroupChatState {
  hoverId: string;
  chooseId: string[];
  inputSearch: string;
}

interface ICreateGroupChatRef {
  divWrapperRef: HTMLDivElement | null;
  isKeyPress: boolean;
}

const intitCGCState: ICreateGroupChatState = {
  hoverId: "",
  chooseId: [],
  inputSearch: "",
};

const initCGCWrapperRef: ICreateGroupChatRef = {
  divWrapperRef: null,
  isKeyPress: false,
};

const CreateGroupChat: React.FC = () => {
  const { friendList } = useAppSelector((state) => state.friend);
  const [cGCState, setCGCState] =
    React.useState<ICreateGroupChatState>(intitCGCState);

  const { getRef, setRef } = useRefManager<ICreateGroupChatRef>({
    defaultValue: initCGCWrapperRef,
  });

  React.useLayoutEffect(() => {
    if (friendList.length > 0)
      setCGCState({ ...cGCState, hoverId: friendList[0].userId });
  }, []);

  React.useEffect(() => {
    getRef("divWrapperRef")?.focus();
  }, []);

  React.useEffect(() => {
    if (getRef("isKeyPress")) {
      const scrollInToViewItem = getRef("divWrapperRef")?.querySelector(
        '[data-select="selected"]',
      );
      if (scrollInToViewItem)
        scrollInToViewItem.scrollIntoView({
          block: "nearest",
          inline: "center",
          behavior: "auto",
        });
    }
  }, [getRef("isKeyPress"), cGCState.hoverId]);

  const handleInputChange = React.useCallback((value: string) => {
    setCGCState((pre) => ({
      ...pre,
      inputSearch: value,
    }));
  }, []);

  const handleMouseEnter = React.useCallback((userId: string) => {
    setCGCState((pre) => ({
      ...pre,
      hoverId: userId,
    }));
  }, []);

  const handleWrapperKeyDown = React.useCallback(
    (
      e: React.KeyboardEvent<HTMLElement>,
      userList: IUser[],
      hoverId: string,
    ) => {
      if (userList.length === 0) return;

      const currentIndex = userList.findIndex(
        (user) => user.userId === hoverId,
      );

      setRef("isKeyPress")(true);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % userList.length;
        const nextUserId = userList[nextIndex].userId;
        setCGCState((pre) => ({
          ...pre,
          hoverId: nextUserId,
        }));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex =
          (currentIndex - 1 + userList.length) % userList.length;
        const prevUserId = userList[prevIndex].userId;
        setCGCState((pre) => ({
          ...pre,
          hoverId: prevUserId,
        }));
      } else if (e.key === "Enter") {
        e.preventDefault();
        setCGCState((pre) => {
          const updatedChooseId = pre.chooseId.includes(hoverId)
            ? pre.chooseId.filter((id) => id !== hoverId)
            : [...pre.chooseId, hoverId];

          return {
            ...pre,
            chooseId: updatedChooseId,
          };
        });
      }
    },
    [],
  );

  const handleItemClick = React.useCallback((userId: string) => {
    setCGCState((pre) => {
      const updatedChooseId = pre.chooseId.includes(userId)
        ? pre.chooseId.filter((id) => id !== userId)
        : [...pre.chooseId, userId];

      return {
        ...pre,
        chooseId: updatedChooseId,
      };
    });
  }, []);

  const handleWrapperKeyUp = React.useCallback(() => {
    setRef("isKeyPress")(false);
  }, []);

  const curUsers = React.useMemo(() => {
    return friendList.filter((user) =>
      user.username.toLowerCase().includes(cGCState.inputSearch.toLowerCase()),
    );
  }, [cGCState.inputSearch]);

  const chooseResult = React.useMemo(() => {
    return friendList.filter((user) => cGCState.chooseId.includes(user.userId));
  }, [cGCState.chooseId, friendList]);

  return (
    <div
      className={styles.wrapper}
      tabIndex={0}
      ref={setRef("divWrapperRef")}
      onKeyDown={(e) => handleWrapperKeyDown(e, curUsers, cGCState.hoverId)}
      onKeyUp={handleWrapperKeyUp}
    >
      <div className={styles.searchWrapper}>
        <h1>Chọn Bạn Bè</h1>
        <span>Bạn có thể thêm {friendList.length} người bạn nữa.</span>
        <div className={styles.inputResultWrapper}>
          {chooseResult.length > 0 &&
            chooseResult.map((user) => (
              <div
                key={user.userId}
                className={styles.chooseResult}
                onClick={() => handleItemClick(user.userId)}
              >
                <p>{user.username}</p>
                <CloseIcon />
              </div>
            ))}
          <input
            type="text"
            placeholder="Nhập tên người dùng của bạn bè"
            value={cGCState.inputSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.friendListWrapper}>
        {curUsers.length > 0 &&
          curUsers.map((user) => (
            <div
              key={user.userId}
              className={styles.itemWrapper}
              data-select={user.userId === cGCState.hoverId ? "selected" : ""}
              onMouseEnter={() => handleMouseEnter(user.userId)}
              onClick={() => handleItemClick(user.userId)}
            >
              <MainButtonExpand
                mainButtonProps={{
                  buttonSize: "SMALL",
                  imageUrl: user.imageUrl,
                  name: user.username,
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
                    Icon: (
                      <div className={styles.iconWrapper}>
                        {cGCState.chooseId.includes(user.userId) ? (
                          <CheckIcon />
                        ) : (
                          <></>
                        )}
                      </div>
                    ),
                    isShownOnHover: false,
                  },
                ]}
                isHoverWithState={true}
                isHovering={cGCState.hoverId === user.userId}
              />
            </div>
          ))}
        {curUsers.length === 0 && (
          <div className={styles.noResult}>
            <SearchNoResultIcon />
            <span>Không tìm thấy bạn bè đang trong DM này.</span>
          </div>
        )}
      </div>
      <div className={styles.seperator}></div>
      <div className={styles.actionWrapper}>
        <Button variant="contained">
          {cGCState.chooseId.length > 1 ? "Tạo nhóm DM" : "Tạo DM"}
        </Button>
      </div>
    </div>
  );
};

export default CreateGroupChat;
