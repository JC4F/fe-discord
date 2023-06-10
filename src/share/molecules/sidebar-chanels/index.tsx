import React from "react";
import MainButton, { IMainButtonIcon } from "share/atoms/main-button";
import { ReactComponent as DiscordLogo } from "assest/svg/discord-icon.svg";
import { ReactComponent as Event } from "assest/svg/event-svgrepo-com.svg";
import { ReactComponent as Add } from "assest/svg/add-svgrepo-com.svg";
import { ReactComponent as Discover } from "assest/svg/discover-1-svgrepo-com.svg";
import IconWrapper from "share/atoms/icon-wrapper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { IChanelItem, updateChoosingChanelId } from "store/chanel";
import styles from "./index.module.css";

const SidebarChanels: React.FC = () => {
  const { userId } = useAppSelector((state) => state.authen.user);
  const { chanelList, choosingChanelId } = useAppSelector(
    (state) => state.chanel,
  );
  const dispatch = useAppDispatch();
  // const [sBState, setSBState] = React.useState<ISideBarState>(initSideBarState);
  const navigate = useNavigate();

  const getIconList = React.useCallback((chanelItem: IChanelItem) => {
    const iconList: IMainButtonIcon[] = [];
    if (chanelItem.isEventing) {
      iconList.push({
        Icon: <IconWrapper content={<Event />} />,
        iconPosition: "TOP-RIGHT",
      });
    }

    if (chanelItem.numNotify && chanelItem.numNotify > 0) {
      iconList.push({
        Icon: <IconWrapper content={`${chanelItem.numNotify}`} />,
        iconPosition: "BOTTOM-RIGHT",
      });
    }

    return iconList;
  }, []);

  const handleClickDiscordLogo = React.useCallback(() => {
    dispatch(updateChoosingChanelId({ choosingChanelId: "" }));
    navigate("/chanels/@me");
  }, []);

  const handleClickChooseChanel = React.useCallback((chanelId: string) => {
    dispatch(updateChoosingChanelId({ choosingChanelId: chanelId }));
  }, []);

  const handleCreateNewChanel = React.useCallback(() => {}, [userId]);

  const handleDiscover = React.useCallback(() => {}, [userId]);

  return (
    <div className={styles.sideBarWrapper}>
      <MainButton
        iconList={[
          {
            Icon: <DiscordLogo />,
            iconPosition: "CENTER",
          },
        ]}
        handleClick={handleClickDiscordLogo}
        isChanelChoosen={choosingChanelId === ""}
      />
      {chanelList.length > 0 &&
        chanelList.map((chanel) => (
          <MainButton
            key={chanel.chanelId}
            name={chanel.chanelName}
            imageUrl={chanel.imageUrl}
            iconList={getIconList(chanel)}
            handleClick={() => handleClickChooseChanel(chanel.chanelId)}
            isChanelChoosen={chanel.chanelId === choosingChanelId}
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
