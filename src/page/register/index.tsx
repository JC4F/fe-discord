import React from "react";
import { Link } from "react-router-dom";
import { useRefManager } from "hooks";
import FormLayout from "share/form-layout";
import InputForm from "share/input";
import styles from "./index.module.css";
import { Button } from "@mui/material";
import InputSelect, { ISelected } from "share/input-select";

interface IRegisterRef {
  emailRef: HTMLInputElement | null;
  usernamelRef: HTMLInputElement | null;
  passwordRef: HTMLInputElement | null;
  errorMessage: {
    email: string | null;
    password: string | null;
  };
}

const initRegisterRef: IRegisterRef = {
  emailRef: null,
  usernamelRef: null,
  passwordRef: null,
  errorMessage: {
    email: null,
    password: null,
  },
};

const dummys: ISelected[] = [
  { representedValue: "Thang 1", realValue: "1" },
  { representedValue: "Thang 2", realValue: "2" },
  { representedValue: "Thang 3", realValue: "3" },
  { representedValue: "Thang 4", realValue: "4" },
  { representedValue: "Thang 5", realValue: "5" },
  { representedValue: "Thang 6", realValue: "6" },
  { representedValue: "Thang 7", realValue: "7" },
  { representedValue: "Thang 8", realValue: "8" },
  { representedValue: "Thang 9", realValue: "9" },
  { representedValue: "Thang 10", realValue: "10" },
  { representedValue: "Thang 11", realValue: "11" },
  { representedValue: "Thang 12", realValue: "12" },
];

const Register: React.FC = () => {
  const { getRef, setRef } = useRefManager<IRegisterRef>({
    defaultValue: initRegisterRef,
  });

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
        <InputSelect placeholder="Thang" selectData={dummys} />
        {/* button nhap email */}
        <Button variant="contained" className={styles.button}>
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
