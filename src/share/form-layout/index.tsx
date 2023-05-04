import { PropsWithChildren } from "react";
import { ReactComponent as FormLayoutSvg } from "assest/svg/form-layout.svg";
import { ReactComponent as GoogleSvg } from "assest/svg/google-multicolor.svg";
import styles from "./index.module.css";
import { Button } from "@mui/material";
import { openCenteredPopup } from "utils";

const FormLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const handleSSOLogin = () => {
    openCenteredPopup(
      `${
        process.env.REACT_APP_BASE_URL ?? "http://localhost:8000/"
      }authen/google`,
      `Login with Goole`,
      500,
      500,
    );
  };

  return (
    <>
      <div className={styles.contentWapper}>
        <FormLayoutSvg className={styles.svg} />
        <div className={`${styles.childrenWrapper} ${styles.childrenQuery}`}>
          {children}
          <div className={styles.SSOWrapper}>
            <h2>SSO WITH</h2>
            <div className={styles.loginTypeWrapper}>
              <Button
                variant="contained"
                startIcon={<GoogleSvg className={styles.googleSvg} />}
                onClick={handleSSOLogin}
              >
                Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
