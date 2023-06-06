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
  disabledHover?: boolean;
}

const MainButton: React.FC<IMainButtonProps> = ({
  name,
  isChanelChoosen = false,
  iconList,
  imageUrl,
  buttonSize = "MEDIUM",
  handleClick,
  disabledHover = false,
}) => {
  const getIconWrapperClass = React.useCallback(
    (iconList: IMainButtonIcon, buttonSize: "BIG" | "MEDIUM" | "SMALL") => {
      const postFix = buttonSize.split("")[0];
      switch (iconList.iconPosition) {
        case "TOP-LEFT":
          return styles[`iconWrapperTL${postFix}`];
        case "TOP-RIGHT":
          return styles[`iconWrapperTR${postFix}`];
        case "BOTTOM-LEFT":
          return styles[`iconWrapperBL${postFix}`];
        case "BOTTOM-RIGHT":
          return styles[`iconWrapperBR${postFix}`];
        case "CENTER":
          return styles[`iconWrapperCT${postFix}`];
        case "COVER":
          return styles[`iconWrapperCV${postFix}`];
        default:
          return "";
      }
    },
    [],
  );

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
          disabledHover
            ? styles.buttonDisableHover
            : isChanelChoosen
            ? styles.buttonWrapperChoosen
            : styles.buttonWrapper
        }
        onClick={handleClick}
      >
        {!imageUrl && name && <p className={styles.customName}>{name}</p>}
        {imageUrl && (
          <img className={styles.customImage} src={imageUrl} alt="avatar" />
        )}
        {iconList &&
          iconList.length > 0 &&
          iconList.map((item, index) => (
            <div key={index} className={getIconWrapperClass(item, buttonSize)}>
              {item.Icon}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainButton;
