import React from "react";
import MainButton, { IIcon } from "share/atoms/main-button";
import { ReactComponent as Event } from "assest/svg/event-svgrepo-com.svg";
import { ReactComponent as Add } from "assest/svg/add-svgrepo-com.svg";
import { ReactComponent as Discover } from "assest/svg/discover-1-svgrepo-com.svg";
import IconWrapper from "share/atoms/icon-wrapper";
import { useAppSelector } from "store/hooks";
import styles from "./index.module.css";

export interface IChanelItem {
  chanelId: string;
  chanelName: string;
  imageUrl?: string;
  newNotifyCount?: number;
  isEventing?: boolean;
}

interface ISidebarChanelsProps extends React.PropsWithChildren {
  chanelList: IChanelItem[];
}

const SidebarChanels: React.FC<ISidebarChanelsProps> = ({ chanelList }) => {
  const { userId } = useAppSelector((state) => state.authen.user);
  const [chanelIdChoosing, setChanelIdChoosing] = React.useState<string>("");

  const getIconList = React.useCallback((chanelItem: IChanelItem) => {
    const iconList: IIcon[] = [];
    if (chanelItem.isEventing) {
      iconList.push({
        Icon: <IconWrapper content={<Event />} />,
        iconPosition: "TOP-RIGHT",
      });
    }

    if (chanelItem.newNotifyCount && chanelItem.newNotifyCount > 0) {
      iconList.push({
        Icon: <IconWrapper content={`${chanelItem.newNotifyCount}`} />,
        iconPosition: "BOTTOM-RIGHT",
      });
    }

    return iconList;
  }, []);

  const handleClickChooseChanel = React.useCallback((chanelId: string) => {
    setChanelIdChoosing(chanelId);

    // call api + fetch data ...
  }, []);

  const handleCreateNewChanel = React.useCallback(() => {
    // call api + fetch data ...
  }, [userId]);

  const handleDiscover = React.useCallback(() => {
    // call api + fetch data ...
  }, [userId]);

  return (
    <div className={styles.sideBarWrapper}>
      {chanelList.length > 0 &&
        chanelList.map((item) => (
          <MainButton
            key={item.chanelId}
            name={item.chanelName}
            imageUrl={item.imageUrl}
            iconList={getIconList(item)}
            handleClick={() => handleClickChooseChanel(item.chanelId)}
            isChanelChoosen={chanelIdChoosing === item.chanelId}
          />
        ))}
      <MainButton
        iconList={[
          {
            Icon: <Add />,
            iconPosition: "CENTER",
          },
        ]}
        handleClick={handleCreateNewChanel}
      />
      <MainButton
        iconList={[
          {
            Icon: <Discover />,
            iconPosition: "CENTER",
          },
        ]}
        handleClick={handleDiscover}
      />
    </div>
  );
};

export default SidebarChanels;
