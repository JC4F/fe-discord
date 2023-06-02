import React from "react";
import { Link } from "react-router-dom";
import { useRefManager } from "hooks";
import FormLayout from "share/molecules/form-layout";
import InputForm from "share/atoms/input";
import styles from "./index.module.css";
import { Button, Checkbox } from "@mui/material";
import { RegisterErrorMessage, RegisterMessage } from "constant";
import GroupDate from "./group-date";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authenAsync, removeErrorMess } from "store/authen";

interface IRegisterState {
  errorMessage: {
    email: string;
    username: string;
    password: string;
    birth: string;
  };
}

interface IRegisterRef {
  emailRef: HTMLInputElement | null;
  usernamelRef: HTMLInputElement | null;
  passwordRef: HTMLInputElement | null;
  dateOfBirthRef: any;
  isReceiveEmail: HTMLButtonElement | null;
  haveErrorRef: boolean;
}

const initRegisterState: IRegisterState = {
  errorMessage: {
    email: "",
    username: "",
    password: "",
    birth: "",
  },
};

const initRegisterRef: IRegisterRef = {
  emailRef: null,
  usernamelRef: null,
  passwordRef: null,
  dateOfBirthRef: null,
  isReceiveEmail: null,
  haveErrorRef: false,
};

const Register: React.FC = () => {
  const { errorMess, status } = useAppSelector((state) => state.authen);
  const dispatch = useAppDispatch();

  const [registerState, setRegistertate] =
    React.useState<IRegisterState>(initRegisterState);

  const { getRef, setRef } = useRefManager<IRegisterRef>({
    defaultValue: initRegisterRef,
  });

  // remove error messages before enter page
  React.useLayoutEffect(() => {
    dispatch(removeErrorMess());
  }, []);

  // clear input when error
  React.useEffect(() => {
    if (errorMess) {
      (getRef("emailRef") as HTMLInputElement).value = "";
      (getRef("usernamelRef") as HTMLInputElement).value = "";
      (getRef("passwordRef") as HTMLInputElement).value = "";
      (
        getRef("isReceiveEmail")?.querySelector("input") as HTMLInputElement
      ).checked = false;
      getRef("dateOfBirthRef").resetChoosen();
    }
  }, [errorMess]);

  const handleOnclickButtonSubmit = async () => {
    const submitData: Record<string, any> = {
      email: getRef("emailRef")?.value,
      username: getRef("usernamelRef")?.value,
      password: getRef("passwordRef")?.value,
      date: getRef("dateOfBirthRef").getDate(),
      isReceiveEmail: getRef("isReceiveEmail")?.querySelector("input")?.checked,
    };

    setRef("haveErrorRef")(false);

    for (const key in submitData) {
      if (Object.prototype.hasOwnProperty.call(submitData, key)) {
        setRegistertate((pre) => ({
          ...pre,
          errorMessage: {
            ...pre.errorMessage,
            [key]: submitData[key] === "" ? RegisterErrorMessage.REQUIRE : "",
          },
        }));

        if (submitData[key] === "") setRef("haveErrorRef")(true);
      }
    }

    if (getRef("haveErrorRef")) return;

    await dispatch(authenAsync({ type: "REGISTER", submitData }));
  };

  return (
    <FormLayout>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1>Tao tai khoan</h1>
        </div>
        {errorMess && !getRef("haveErrorRef") && (
          <p className={styles.error}>{errorMess}</p>
        )}
        <InputForm
          labelMessage="EMAIL"
          inputType="text"
          isRequired
          errorMessage={registerState.errorMessage.email}
          ref={setRef("emailRef")}
        />
        <InputForm
          labelMessage="TEN DANG NHAP"
          inputType="text"
          isRequired
          errorMessage={registerState.errorMessage.password}
          ref={setRef("usernamelRef")}
        />
        <InputForm
          labelMessage="MAT KHAU"
          inputType="password"
          isRequired
          errorMessage={registerState.errorMessage.password}
          ref={setRef("passwordRef")}
        />
        <GroupDate ref={setRef("dateOfBirthRef")} />
        <div className={styles.checkBoxWrapper}>
          <Checkbox
            className={styles.customChecbox}
            ref={setRef("isReceiveEmail")}
          />
          <div className={styles.checkBoxDiscription}>
            {RegisterMessage.CHECKBOX_EMAIL}
          </div>
        </div>
        <Button
          variant="contained"
          className={styles.button}
          disabled={status === "LOADING"}
          onClick={handleOnclickButtonSubmit}
        >
          Tiep tuc
        </Button>
        <p className={styles.login}>
          <Link to="/login" className={styles.customLink}>
            Da co tai khoan
          </Link>
        </p>
      </div>
    </FormLayout>
  );
};

export default Register;
