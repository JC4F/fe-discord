import { PropsWithChildren } from "react";
import { ReactComponent as FormLayoutSvg } from "assest/svg/form-layout.svg";
import styles from "./form-layout.module.css";

const FormLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.contentWapper}>
        <FormLayoutSvg className={styles.svg} />
        <div className={`${styles.childrenWrapper} ${styles.childrenQuery}`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default FormLayout;
