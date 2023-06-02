import React from "react";
import MainButton from "../main-button";
import { ReactComponent as Sleep } from "assest/svg/sleep-svgrepo-com.svg";
import styles from "./index.module.css";

interface IRepresentUserBtnProps extends React.PropsWithChildren {
  username: string;
  imageUrl: string;
  userId?: string;
}

const RepresentUserBtn: React.FC<IRepresentUserBtnProps> = ({
  imageUrl,
  username,
}) => {
  return (
    <div className={styles.RepresentUserBtnWrapper}>
      <MainButton
        imageUrl={imageUrl}
        iconList={[
          {
            Icon: <Sleep />,
            iconPosition: "BOTTOM-RIGHT",
          },
        ]}
      />
      <h4>{username}</h4>
    </div>
  );
};

export default RepresentUserBtn;
