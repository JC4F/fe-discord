import React from "react";
import { IUserState } from "store/authen/type";
import { ReactComponent as ActiveIcon } from "assest/svg/active.svg";
import { ReactComponent as InActiveIcon } from "assest/svg/inactive.svg";
import { ReactComponent as BusyIcon } from "assest/svg/busy.svg";
import { ReactComponent as WaitIcon } from "assest/svg/waiting.svg";
import styles from "./index.module.css";

interface IIconStateWrapperProps {
  state: IUserState;
}

const IconStateWrapper: React.FC<IIconStateWrapperProps> = ({ state }) => {
  const getStateIcon = React.useCallback((state: IUserState) => {
    let mainIcon = <></>;
    if (state === "ACTIVE") {
      mainIcon = <ActiveIcon />;
    } else if (state === "INACTIVE") {
      mainIcon = <InActiveIcon />;
    } else if (state === "BUSY") {
      mainIcon = <BusyIcon />;
    } else {
      mainIcon = <WaitIcon />;
    }

    return <div className={styles.customIcon}>{mainIcon}</div>;
  }, []);

  return <div className={styles.customIcon}>{getStateIcon(state)}</div>;
};

export default IconStateWrapper;
