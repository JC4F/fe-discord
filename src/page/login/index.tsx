import React from "react";
import { Link } from "react-router-dom";
import FormLayout from "share/form-layout";
import styles from "./index.module.css";
import InputForm from "share/input";
import { useRefManager } from "hooks";
import { Button } from "@mui/material";
import QRCode from "./qr";
import { LoginErrorMessage } from "constant";

interface ILoginState {
  errorMessage: {
    email: string;
    password: string;
  };
}

interface ILoginRef {
  emailRef: HTMLInputElement | null;
  passwordRef: HTMLInputElement | null;
}

const initLoginState: ILoginState = {
  errorMessage: {
    email: "",
    password: "",
  },
};

const initLoginRef: ILoginRef = {
  emailRef: null,
  passwordRef: null,
};

const Login: React.FC = () => {
  // disable btn, input khi gọi req ~ context?

  const [loginState, setLoginState] =
    React.useState<ILoginState>(initLoginState);

  const { getRef, setRef } = useRefManager<ILoginRef>({
    defaultValue: initLoginRef,
  });

  const handleOnclickButtonSubmit = () => {
    // check validate: required
    let isError: boolean = false;
    const submitData: Record<string, any> = {
      email: getRef("emailRef")?.value,
      password: getRef("passwordRef")?.value,
    };

    for (const key in submitData) {
      if (Object.prototype.hasOwnProperty.call(submitData, key)) {
        setLoginState((pre) => ({
          ...pre,
          errorMessage: {
            ...pre.errorMessage,
            [key]: submitData[key] === "" ? LoginErrorMessage.REQUIRE : "",
          },
        }));

        if (submitData[key] === "") isError = true;
      }
    }

    if (isError) return;

    console.log("check sumit data: ", submitData);
  };

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
          errorMessage={loginState.errorMessage.email}
          ref={setRef("emailRef")}
        />
        <InputForm
          labelMessage="MAT KHAU"
          inputType="password"
          isRequired
          errorMessage={loginState.errorMessage.password}
          ref={setRef("passwordRef")}
        />
        <p className={styles.forgot}>Quen mat khau?</p>
        <Button
          variant="contained"
          className={styles.button}
          onClick={handleOnclickButtonSubmit}
        >
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
