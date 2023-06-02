import React from "react";
import { Link } from "react-router-dom";
import FormLayout from "share/molecules/form-layout";
import styles from "./index.module.css";
import InputForm from "share/atoms/input";
import { useRefManager } from "hooks";
import { Button } from "@mui/material";
import QRCode from "./qr";
import { LoginErrorMessage } from "constant";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authenAsync, removeErrorMess } from "store/authen";

interface ILoginState {
  errorMessage: {
    email: string;
    password: string;
  };
}

interface ILoginRef {
  emailRef: HTMLInputElement | null;
  passwordRef: HTMLInputElement | null;
  haveErrorRef: boolean;
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
  haveErrorRef: false,
};

const Login: React.FC = () => {
  // disable btn, input khi gọi req ~ context?
  const { errorMess, status } = useAppSelector((state) => state.authen);
  const dispatch = useAppDispatch();

  const [loginState, setLoginState] =
    React.useState<ILoginState>(initLoginState);

  const { getRef, setRef } = useRefManager<ILoginRef>({
    defaultValue: initLoginRef,
  });

  // remove error messages before enter page
  React.useLayoutEffect(() => {
    dispatch(removeErrorMess());
  }, []);

  // clear input when error
  React.useEffect(() => {
    if (errorMess) {
      (getRef("emailRef") as HTMLInputElement).value = "";
      (getRef("passwordRef") as HTMLInputElement).value = "";
    }
  }, [errorMess]);

  const handleOnclickButtonSubmit = async () => {
    const submitData: Record<string, any> = {
      email: getRef("emailRef")?.value,
      password: getRef("passwordRef")?.value,
    };

    setRef("haveErrorRef")(false);

    for (const key in submitData) {
      if (Object.prototype.hasOwnProperty.call(submitData, key)) {
        setLoginState((pre) => ({
          ...pre,
          errorMessage: {
            ...pre.errorMessage,
            [key]: submitData[key] === "" ? LoginErrorMessage.REQUIRE : "",
          },
        }));

        if (submitData[key] === "") setRef("haveErrorRef")(true);
      }
    }

    if (getRef("haveErrorRef")) return;

    await dispatch(authenAsync({ type: "LOGIN", submitData }));
  };

  return (
    <FormLayout>
      <div className={styles.childrenWrapper}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1>Chao mung tro lai</h1>
            <p>Rat vui mung khi gap duoc gap lai ban</p>
          </div>
          {errorMess && !getRef("haveErrorRef") && (
            <p className={styles.error}>{errorMess}</p>
          )}
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
            disabled={status === "LOADING"}
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
      </div>
    </FormLayout>
  );
};

export default Login;
