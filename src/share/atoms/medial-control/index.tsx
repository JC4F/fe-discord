import React from "react";
import MainButton from "../main-button";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ReactComponent as MicOn } from "assest/svg/mic-on-svgrepo-com.svg";
import { ReactComponent as MicOff } from "assest/svg/mic-off-svgrepo-com.svg";
import { ReactComponent as HeadPhoneOn } from "assest/svg/headphone-svgrepo-com.svg";
import { ReactComponent as HeadPhoneOff } from "assest/svg/headphone-slash-svgrepo-com.svg";
import { ReactComponent as Setting } from "assest/svg/settings-svgrepo-com.svg";
import { toggleHeadPhone, toggleMic } from "store/authen";
import IconStateWrapper from "../icon-state-wrapper";
import styles from "./index.module.css";

const MediaControl: React.FC = () => {
  const {
    user: { imageUrl, username },
    userSettings: { isHeadPhoneOn, isMicOn, userState },
  } = useAppSelector((state) => state.authen);
  const dispatch = useAppDispatch();

  const handleToggleMic = React.useCallback(() => dispatch(toggleMic()), []);
  const handleToggleHeadPhone = React.useCallback(
    () => dispatch(toggleHeadPhone()),
    [],
  );

  return (
    <div className={styles.mediaControlWrapper}>
      <div className={styles.left}>
        <MainButton
          imageUrl={imageUrl}
          buttonSize="SMALL"
          iconList={[
            {
              Icon: <IconStateWrapper state={userState} />,
              iconPosition: "BOTTOM-RIGHT",
            },
          ]}
        />
        <p>{username}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.iconWrapper} onClick={handleToggleMic}>
          {isMicOn ? <MicOn /> : <MicOff />}
        </div>
        <div className={styles.iconWrapper} onClick={handleToggleHeadPhone}>
          {isHeadPhoneOn ? <HeadPhoneOn /> : <HeadPhoneOff />}
        </div>
        <div className={styles.iconWrapper}>
          <Setting />
        </div>
      </div>
    </div>
  );
};

export default MediaControl;
