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
    representName: string;
    extraInfo?: string;
  };
  onClick?: () => void;
  iconList?: IMainButonExpandIcon[];
  isButtonChoosen?: boolean;
}

const MainButtonExpand: React.FC<IMainButtonExpandProps> = ({
  mainButtonProps,
  des,
  onClick,
  iconList,
  isButtonChoosen = false,
}) => {
  return (
    <div
      className={
        isButtonChoosen ? styles.buttonChoosingWrapper : styles.buttonWrapper
      }
      onClick={onClick}
      data-wrapper
    >
      <div className={styles.left}>
        <MainButton
          {...mainButtonProps}
          isChanelChoosen={isButtonChoosen}
          disabledHover={true}
        />
        <div className={styles.des}>
          <h2>{des.representName}</h2>
          {des.extraInfo && <span>{des.extraInfo}</span>}
        </div>
      </div>
      <div className={styles.right}>
        {iconList?.map((icon, index) => (
          <div
            key={index}
            className={
              icon.isShownOnHover ? styles.iconHide : styles.iconDisplay
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
