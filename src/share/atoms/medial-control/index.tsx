import React from "react";
import MainButton from "../main-button";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ReactComponent as MicOn } from "assest/svg/mic-on-svgrepo-com.svg";
import { ReactComponent as MicOff } from "assest/svg/mic-off-svgrepo-com.svg";
import { ReactComponent as HeadPhoneOn } from "assest/svg/headphone-svgrepo-com.svg";
import { ReactComponent as HeadPhoneOff } from "assest/svg/headphone-slash-svgrepo-com.svg";
import { ReactComponent as Setting } from "assest/svg/settings-svgrepo-com.svg";
import styles from "./index.module.css";
import { toggleHeadPhone, toggleMic } from "store/authen";

const MediaControl: React.FC = () => {
  const {
    user: { imageUrl, username },
    userSettings: { isHeadPhoneOn, isMicOn },
  } = useAppSelector((state) => state.authen);
  const dispatch = useAppDispatch();

  const handleToggleMic = React.useCallback(() => dispatch(toggleMic), []);
  const handleToggleHeadPhone = React.useCallback(
    () => dispatch(toggleHeadPhone),
    [],
  );

  return (
    <div className={styles.mediaControlWrapper}>
      <div className={styles.left}>
        <MainButton imageUrl={imageUrl} />
        <p>{username}</p>
      </div>
      <div className={styles.right}>
        <div onClick={handleToggleMic}>{isMicOn ? <MicOn /> : <MicOff />}</div>
        <div onClick={handleToggleHeadPhone}>
          {isHeadPhoneOn ? <HeadPhoneOn /> : <HeadPhoneOff />}
        </div>
        <Setting />
      </div>
    </div>
  );
};

export default MediaControl;
