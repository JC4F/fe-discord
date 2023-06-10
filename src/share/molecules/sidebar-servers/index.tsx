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
import ToolTipWrapper from "share/atoms/tooltip-wrapper";

const SidebarServer: React.FC = () => {
  const { userId } = useAppSelector((state) => state.authen.user);
  const { serverList, choosingServerId } = useAppSelector(
    (state) => state.server,
  );
  const dispatch = useAppDispatch();
  // const [sBState, setSBState] = React.useState<ISideBarState>(initSideBarState);
  const navigate = useNavigate();

  const getIconList = React.useCallback((server: IServerItem) => {
    const iconList: IMainButtonIcon[] = [];
    if (server.isEventing) {
      iconList.push({
        Icon: <IconWrapper content={<Event />} />,
        iconPosition: "TOP-RIGHT",
      });
    }

    if (server.numNotify && server.numNotify > 0) {
      iconList.push({
        Icon: <IconWrapper content={`${server.numNotify}`} />,
        iconPosition: "BOTTOM-RIGHT",
      });
    }

    return iconList;
  }, []);

  const getServerName = React.useCallback((server: IServerItem) => {
    if (server.serverName) return server.serverName;
    else return `Máy chủ của ${server.hostName}`;
  }, []);

  const handleClickDiscordLogo = React.useCallback(() => {
    dispatch(updatechoosingServerId({ choosingServerId: "" }));
    navigate("/chanels/@me");
  }, []);

  const handleClickChooseServer = React.useCallback((server: IServerItem) => {
    let navigateRoute = server.serverId;
    if (
      server.directoryChanelList.length > 0 &&
      server.directoryChanelList[0].chanelList.length > 0 &&
      server.directoryChanelList[0].chanelList[0].chanelId
    ) {
      navigateRoute = `/chanels/${navigateRoute}/${server.directoryChanelList[0].chanelList[0].chanelId}`;
      console.log(navigateRoute);
    }

    dispatch(updatechoosingServerId({ choosingServerId: server.serverId }));
    navigate(navigateRoute);
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
          <ToolTipWrapper
            key={server.serverId}
            content={
              <MainButton
                name={getServerName(server)}
                imageUrl={server.imageUrl}
                iconList={getIconList(server)}
                handleClick={() => handleClickChooseServer(server)}
                isButtonChoosen={server.serverId === choosingServerId}
              />
            }
            title={getServerName(server)}
            isIcon={false}
            placement="right"
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
