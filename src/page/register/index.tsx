import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRefManager } from "hooks";
import FormLayout from "share/form-layout";
import InputForm from "share/input";
import styles from "./index.module.css";
import { Button, Checkbox } from "@mui/material";
import { RegisterErrorMessage, RegisterMessage } from "constant";
import GroupDate from "./group-date";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { registerAsync } from "store/authen";

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
};

const Register: React.FC = () => {
  const accessToken = useAppSelector((state) => state.authen.user.accessToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registerState, setRegistertate] =
    React.useState<IRegisterState>(initRegisterState);

  React.useLayoutEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const { getRef, setRef } = useRefManager<IRegisterRef>({
    defaultValue: initRegisterRef,
  });

  const handleOnclickButtonSubmit = async () => {
    // check validate
    let isError: boolean = false;
    const submitData: Record<string, any> = {
      email: getRef("emailRef")?.value,
      username: getRef("usernamelRef")?.value,
      password: getRef("passwordRef")?.value,
      date: getRef("dateOfBirthRef").getDate(),
      isReceiveEmail: getRef("isReceiveEmail")?.querySelector("input")?.checked,
    };

    for (const key in submitData) {
      if (Object.prototype.hasOwnProperty.call(submitData, key)) {
        setRegistertate((pre) => ({
          ...pre,
          errorMessage: {
            ...pre.errorMessage,
            [key]: submitData[key] === "" ? RegisterErrorMessage.REQUIRE : "",
          },
        }));

        if (submitData[key] === "") isError = true;
      }
    }

    if (isError) return;

    await dispatch(registerAsync(submitData));
  };

  return (
    <FormLayout>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1>Tao tai khoan</h1>
        </div>
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
