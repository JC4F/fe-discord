import React from "react";
import { Link } from "react-router-dom";
import FormLayout from "share/form-layout";
import styles from "./index.module.css";
import InputForm from "share/input";
import { useRefManager } from "hooks";
import { Button } from "@mui/material";
import QRCode from "./qr";

interface ILoginRef {
  emailRef: HTMLInputElement | null;
  passwordRef: HTMLInputElement | null;
  errorMessage: {
    email: string | null;
    password: string | null;
  };
}

const initLoginRef: ILoginRef = {
  emailRef: null,
  passwordRef: null,
  errorMessage: {
    email: null,
    password: null,
  },
};

const Login: React.FC = () => {
  // disable btn, input khi gọi req ~ context?

  const { getRef, setRef } = useRefManager<ILoginRef>({
    defaultValue: initLoginRef,
  });

  return (
    <FormLayout>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1>Chao mung tro lai</h1>
          <p>Rat vui mung khi gap duoc gap lai ban</p>
        </div>
        <InputForm
          labelMessage="EMAIL HOAC SO DIEN THOAI"
          inputType="text"
          isRequired
          errorMessage={getRef("errorMessage").email}
          ref={setRef("emailRef")}
        />
        <InputForm
          labelMessage="MAT KHAU"
          inputType="password"
          isRequired
          errorMessage={getRef("errorMessage").password}
          ref={setRef("passwordRef")}
        />
        <p className={styles.forgot}>Quen mat khau?</p>
        <Button variant="contained" className={styles.button}>
          Dang nhap
        </Button>
        <p className={styles.register}>
          Can mot tai khoan?
          <Link to="/register" className={styles.customLink}>
            Dang ki
          </Link>
        </p>
      </div>
      <div className={styles.verticalSeperator}></div>
      <QRCode />
    </FormLayout>
  );
};

export default Login;
