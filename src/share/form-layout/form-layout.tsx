import { PropsWithChildren } from "react";
import FormLayoutImage from "assest/image/form-layout.jpg";
import styles from "./form-layout.module.css";

const FormLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.contentWapper}>
        <img className={styles.image} src={FormLayoutImage} alt="form-layout" />
        <div className={`${styles.childrenWrapper} ${styles.childrenQuery}`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default FormLayout;
