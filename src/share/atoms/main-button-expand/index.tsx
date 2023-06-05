import React from "react";
import MainButton, { IMainButtonProps } from "../main-button";
import styles from "./index.module.css";

interface IMainButonExpandIcon {
  Icon: JSX.Element;
  isShownOnHover: boolean;
}

interface IMainButtonExpandProps {
  mainButtonProps: IMainButtonProps;
  des: {
    reprentName: string;
    extraInfo?: string;
  };
  onClick: () => void;
  iconList?: IMainButonExpandIcon[];
}

const MainButtonExpand: React.FC<IMainButtonExpandProps> = ({
  mainButtonProps,
  des,
  onClick,
  iconList,
}) => {
  return (
    <div className={styles.buttonWrapper} onClick={onClick}>
      <div className={styles.left}>
        <MainButton {...mainButtonProps} />
        <div className={styles.des}>
          <h2>{des.reprentName}</h2>
          {des.extraInfo && <span>{des.extraInfo}</span>}
        </div>
      </div>
      <div className={styles.right}>
        {iconList?.map((icon) => (
          <div
            className={
              icon.isShownOnHover ? styles.iconDisplay : styles.iconHide
            }
          >
            {icon.Icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainButtonExpand;
