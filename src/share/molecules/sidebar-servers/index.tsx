import React from "react";
import MainButton, { IMainButtonIcon } from "share/atoms/main-button";
import { ReactComponent as DiscordLogo } from "assest/svg/discord-icon.svg";
import { ReactComponent as Event } from "assest/svg/event-svgrepo-com.svg";
import { ReactComponent as Add } from "assest/svg/add-svgrepo-com.svg";
import { ReactComponent as Discover } from "assest/svg/discover-1-svgrepo-com.svg";
import IconWrapper from "share/atoms/icon-wrapper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { IServerItem, updatechoosingServerId } from "store/server";
import styles from "./index.module.css";

const SidebarServer: React.FC = () => {
  const { userId } = useAppSelector((state) => state.authen.user);
  const { serverList, choosingServerId } = useAppSelector(
    (state) => state.server,
  );
  const dispatch = useAppDispatch();
  // const [sBState, setSBState] = React.useState<ISideBarState>(initSideBarState);
  const navigate = useNavigate();

  const getIconList = React.useCallback((serverItem: IServerItem) => {
    const iconList: IMainButtonIcon[] = [];
    if (serverItem.isEventing) {
      iconList.push({
        Icon: <IconWrapper content={<Event />} />,
        iconPosition: "TOP-RIGHT",
      });
    }

    if (serverItem.numNotify && serverItem.numNotify > 0) {
      iconList.push({
        Icon: <IconWrapper content={`${serverItem.numNotify}`} />,
        iconPosition: "BOTTOM-RIGHT",
      });
    }

    return iconList;
  }, []);

  const handleClickDiscordLogo = React.useCallback(() => {
    dispatch(updatechoosingServerId({ choosingServerId: "" }));
    navigate("/chanels/@me");
  }, []);

  const handleClickChooseServer = React.useCallback((serverId: string) => {
    dispatch(updatechoosingServerId({ choosingServerId: serverId }));
  }, []);

  const handleCreateNewServer = React.useCallback(() => {}, [userId]);

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
        isButtonChoosen={choosingServerId === ""}
      />
      {serverList.length > 0 &&
        serverList.map((server) => (
          <MainButton
            key={server.serverId}
            name={server.serverName}
            imageUrl={server.imageUrl}
            iconList={getIconList(server)}
            handleClick={() => handleClickChooseServer(server.serverId)}
            isButtonChoosen={server.serverId === choosingServerId}
          />
        ))}
      <MainButton
        iconList={[
          {
            Icon: <Add />,
            iconPosition: "CENTER",
          },
        ]}
        handleClick={handleCreateNewServer}
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

export default SidebarServer;
