import React from "react";
import styles from "./index.module.css";

interface IProps {
  labelMessage: string;
  inputType: string;
  isRequired: boolean;
  errorMessage: string;
}

const InputForm = React.forwardRef<HTMLInputElement, IProps>(
  ({ labelMessage, isRequired, errorMessage, inputType }, ref) => {
    return (
      <div
        className={`${styles.inputWrapper} ${
          errorMessage ? styles.redError : ""
        }`}
      >
        <label className={styles.label}>
          {labelMessage}
          {isRequired && errorMessage === "" && (
            <span className={styles.required}>*</span>
          )}
          {errorMessage !== "" && (
            <>
              <span className={styles.seperator}>-</span>
              <span className={styles.error}>{errorMessage}</span>
            </>
          )}
        </label>
        <input type={inputType} ref={ref} className={styles.input} />
      </div>
    );
  },
);

export default InputForm;
