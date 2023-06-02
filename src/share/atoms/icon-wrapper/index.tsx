import React from "react";
import styles from "./index.module.css";

interface IIconWrapperProps extends React.PropsWithChildren {
  content: JSX.Element | string;
}

const IconWrapper: React.FC<IIconWrapperProps> = ({ content }) => {
  return (
    <div className={styles.iconWrapper}>
      {typeof content === "string" ? (
        <div className={styles.contentWrapper}>{content}</div>
      ) : (
        content
      )}
    </div>
  );
};

export default IconWrapper;
