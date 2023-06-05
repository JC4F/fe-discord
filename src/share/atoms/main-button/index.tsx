import React from "react";
import styles from "./index.module.css";

export interface IMainButtonIcon {
  Icon: JSX.Element;
  iconPosition:
    | "TOP-LEFT"
    | "TOP-RIGHT"
    | "BOTTOM-LEFT"
    | "BOTTOM-RIGHT"
    | "CENTER"
    | "COVER";
}

export interface IMainButtonProps extends React.PropsWithChildren {
  name?: string;
  isChanelChoosen?: boolean;
  iconList?: IMainButtonIcon[];
  imageUrl?: string;
  buttonSize?: "BIG" | "MEDIUM" | "SMALL";
  handleClick?: () => void;
}

const MainButton: React.FC<IMainButtonProps> = ({
  name,
  isChanelChoosen = false,
  iconList,
  imageUrl,
  buttonSize = "MEDIUM",
  handleClick,
}) => {
  const getIconWrapperClass = React.useCallback((iconList: IMainButtonIcon) => {
    switch (iconList.iconPosition) {
      case "TOP-LEFT":
        return styles.iconWrapperTL;
      case "TOP-RIGHT":
        return styles.iconWrapperTR;
      case "BOTTOM-LEFT":
        return styles.iconWrapperBL;
      case "BOTTOM-RIGHT":
        return styles.iconWrapperBR;
      case "CENTER":
        return styles.iconWrapperCT;
      case "COVER":
        return styles.iconWrapperCV;
      default:
        return "";
    }
  }, []);

  const getButtonSizeClass = React.useCallback(
    (buttonSize: "BIG" | "MEDIUM" | "SMALL") => {
      switch (buttonSize) {
        case "BIG":
          return styles.buttonWrapperB;
        case "MEDIUM":
          return styles.buttonWrapperM;
        case "SMALL":
          return styles.buttonWrapperS;
        default:
          return "";
      }
    },
    [],
  );

  return (
    <div className={getButtonSizeClass(buttonSize)}>
      <div
        className={
          isChanelChoosen
            ? styles.buttonWrapperChoosen
            : `${styles.buttonWrapper}`
        }
        onClick={handleClick}
      >
        {!imageUrl && <p className={styles.customName}>{name}</p>}
        {imageUrl && (
          <img className={styles.customImage} src={imageUrl} alt="avatar" />
        )}
        {iconList &&
          iconList.length > 0 &&
          iconList.map((item, index) => (
            <div key={index} className={getIconWrapperClass(item)}>
              {item.Icon}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainButton;
