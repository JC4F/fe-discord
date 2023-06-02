import React from "react";
import styles from "./index.module.css";

export interface IIcon {
  Icon: JSX.Element;
  iconPosition:
    | "TOP-LEFT"
    | "TOP-RIGHT"
    | "BOTTOM-LEFT"
    | "BOTTOM-RIGHT"
    | "CENTER";
}

interface IMainButtonProps extends React.PropsWithChildren {
  name?: string;
  isChanelChoosen?: boolean;
  iconList?: IIcon[];
  imageUrl?: string;
  handleClick?: () => void;
}

const MainButton: React.FC<IMainButtonProps> = ({
  name,
  isChanelChoosen = false,
  iconList,
  imageUrl,
  handleClick,
}) => {
  const getIconWrapperStyle = React.useCallback((iconList: IIcon) => {
    switch (iconList.iconPosition) {
      case "TOP-LEFT":
        return styles.iconWrapperTL;
      case "TOP-RIGHT":
        return styles.iconWrapperTR;
      case "BOTTOM-LEFT":
        return styles.iconWrapperBL;
      case "BOTTOM-RIGHT":
        return styles.iconWrapperBR;
      default:
        return "";
    }
  }, []);

  return (
    <div
      className={
        isChanelChoosen
          ? styles.buttonWrapper
          : `${styles.buttonWrapperChoosen}`
      }
      onClick={handleClick}
    >
      {!imageUrl && <p>{name}</p>}
      {imageUrl && <img src={imageUrl} alt="avatar" />}
      {iconList &&
        iconList.length > 0 &&
        iconList.map((item) => (
          <div className={getIconWrapperStyle(item)}>{item.Icon}</div>
        ))}
    </div>
  );
};

export default MainButton;
