import React from "react";
import MainButton, { IMainButtonProps } from "../main-button";
import styles from "./index.module.css";

export interface IMainButonExpandIcon {
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
  canHover?: boolean;
  isHoverWithState?: boolean;
  isHovering?: boolean;
  isButtonChoosen?: boolean;
}

const MainButtonExpand: React.FC<IMainButtonExpandProps> = ({
  mainButtonProps,
  des,
  onClick,
  iconList,
  canHover = true,
  isHoverWithState = false,
  isHovering = false,
  isButtonChoosen = false,
}) => {
  const mainBtnClassName = React.useMemo(() => {
    if (!canHover) return styles.btnCantHover;

    if (isHoverWithState && !isButtonChoosen && !isHovering)
      return styles.btnHoverWithState;
    else if (isHoverWithState && !isButtonChoosen && isHovering)
      return `${styles.btnHoverWithState} ${styles.btnHovered}`;
    else if (isHoverWithState && isButtonChoosen)
      return `${styles.btnHoverWithState} ${styles.btnChoosen}`;
    else if (!isHoverWithState && !isButtonChoosen)
      return styles.btnHoverNormal;
    else if (!isHoverWithState && isButtonChoosen)
      return `${styles.btnHoverNormal} ${styles.btnChoosen}`;
  }, [canHover, isHoverWithState, isButtonChoosen, isHovering]);

  return (
    <div className={mainBtnClassName} onClick={onClick} data-wrapper>
      <div className={styles.left}>
        <MainButton {...mainButtonProps} disabledHover={true} />
        <div className={styles.des} data-infor>
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
