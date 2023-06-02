import React from "react";
import styles from "./index.module.css";
import { IUserState } from "store/authen/type";
import RepresentUserBtn from "share/atoms/represent-user-button";

interface IFriendSidebar {
  userId: string;
  username: string;
  imageUrl: string;
  state: IUserState;
}

// test
const friendList: IFriendSidebar[] = [
  {
    userId: "",
    username: "quan",
    imageUrl: "aaa",
    state: "ACTIVE",
  },
];

// ket noi socketio o day?
const SidebarFriends: React.FC = () => {
  const friendState = React.useMemo(() => {
    const onlineList: IFriendSidebar[] = [];
    const offlineList: IFriendSidebar[] = [];
    friendList.forEach((item) => {
      if (item.state === "INACTIVE") offlineList.push(item);
      else onlineList.push(item);
    });
    return { onlineList, offlineList };
  }, [friendList]);

  return (
    <div className={styles.sidebarFriendsWrapper}>
      {friendState.onlineList.length > 0 && (
        <h4>Truc tuyen - {friendState.onlineList.length}</h4>
      )}
      {friendState.onlineList.length > 0 &&
        friendState.onlineList.map((item) => (
          <RepresentUserBtn username={item.username} imageUrl={item.imageUrl} />
        ))}
      {friendState.offlineList.length > 0 && (
        <h4>Truc tuyen - {friendState.offlineList.length}</h4>
      )}
      {friendState.offlineList.length > 0 &&
        friendState.offlineList.map((item) => (
          <RepresentUserBtn username={item.username} imageUrl={item.imageUrl} />
        ))}
    </div>
  );
};

export default SidebarFriends;
