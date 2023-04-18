import React from "react";
import { Link } from "react-router-dom";
import { useRefManager } from "hooks";
import FormLayout from "share/form-layout";
import InputForm from "share/input";
import styles from "./index.module.css";
import { Button, Checkbox } from "@mui/material";
import { RegisterMessage } from "constant";
import GroupDate from "./group-date";

interface IRegisterRef {
  emailRef: HTMLInputElement | null;
  usernamelRef: HTMLInputElement | null;
  passwordRef: HTMLInputElement | null;
  dateOfBirthRef: any;
  isRecieveEmail: HTMLButtonElement | null;
  errorMessage: {
    email: string;
    password: string;
  };
}

const initRegisterRef: IRegisterRef = {
  emailRef: null,
  usernamelRef: null,
  passwordRef: null,
  dateOfBirthRef: null,
  isRecieveEmail: null,
  errorMessage: {
    email: "",
    password: "",
  },
};

const Register: React.FC = () => {
  const { getRef, setRef } = useRefManager<IRegisterRef>({
    defaultValue: initRegisterRef,
  });

  const handleOnclickButtonSubmit = () => {
    // check validate

    const submitData = {
      email: getRef("emailRef")?.value,
      username: getRef("usernamelRef")?.value,
      password: getRef("passwordRef")?.value,
      date: getRef("dateOfBirthRef").getDate(),
      isRecieveEmail: getRef("isRecieveEmail")?.querySelector("input")?.checked,
    };

    console.log("check sumit data: ", submitData);
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
          errorMessage={getRef("errorMessage").email}
          ref={setRef("emailRef")}
        />
        <InputForm
          labelMessage="TEN DANG NHAP"
          inputType="text"
          isRequired
          errorMessage={getRef("errorMessage").password}
          ref={setRef("usernamelRef")}
        />
        <InputForm
          labelMessage="MAT KHAU"
          inputType="password"
          isRequired
          errorMessage={getRef("errorMessage").password}
          ref={setRef("passwordRef")}
        />
        <GroupDate ref={setRef("dateOfBirthRef")} />
        <div className={styles.checkBoxWrapper}>
          <Checkbox
            className={styles.customChecbox}
            ref={setRef("isRecieveEmail")}
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
