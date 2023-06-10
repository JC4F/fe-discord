import React from "react";
import SidebarServer from "../sidebar-servers";
import MediaControl from "share/atoms/medial-control";
import styles from "./index.module.css";

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
        <SidebarServer />
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
