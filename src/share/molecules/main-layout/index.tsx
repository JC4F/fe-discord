import React from "react";
import SidebarChanels, { IChanelItem } from "../sidebar-chanels";
import MediaControl from "share/atoms/medial-control";
import styles from "./index.module.css";

const chanelList: IChanelItem[] = [
  { chanelId: "1", chanelName: "Chanel 1" },
  {
    chanelId: "2",
    chanelName: "Chanel 2",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXWb33xF2woHnPawT6SffqyIkHkqUr62Vtg&usqp=CAU",
    isEventing: true,
    newNotifyCount: 3,
  },
];

interface IMainLayoutProps extends React.PropsWithChildren {
  NextHeadEle: JSX.Element;
  NextContentEle: JSX.Element;
  MainHeadEle: JSX.Element;
  MainContentEle: JSX.Element;
}

const MainLayout: React.FC<IMainLayoutProps> = ({
  MainContentEle,
  MainHeadEle,
  NextContentEle,
  NextHeadEle,
}) => {
  return (
    <div className={styles.mainLayoutWrapper}>
      <div className={styles.sidebarChanel}>
        <SidebarChanels chanelList={chanelList} />
      </div>
      <div className={styles.nextSidebarChanel}>
        <div className={styles.nextHead}>{NextHeadEle}</div>
        <div className={styles.nextContent}>{NextContentEle}</div>
        <div className={styles.mediaControl}>
          <MediaControl />
        </div>
      </div>
      <div className={styles.mainContentWrapper}>
        <div className={styles.mainHead}>{MainHeadEle}</div>
        <div className={styles.mainContent}>{MainContentEle}</div>
      </div>
    </div>
  );
};

export default MainLayout;
