import React from "react";
import { ReactComponent as NumberSign } from "assest/svg/number-sign-svgrepo-com.svg";
import { ReactComponent as Notification } from "assest/svg/notification-svgrepo-com.svg";
import { ReactComponent as Pin } from "assest/svg/pin-svgrepo-com.svg";
import { ReactComponent as UserManager } from "assest/svg/user-management-filled-svgrepo-com.svg";
import { ReactComponent as Search } from "assest/svg/search-left-1506-svgrepo-com.svg";
import { ReactComponent as Mail } from "assest/svg/mail-svgrepo-com.svg";
import { ReactComponent as Question } from "assest/svg/question-filled-svgrepo-com.svg";
import styles from "./index.module.css";
import { OutlinedInput } from "@mui/material";

const HeaderInfo: React.FC = () => {
  return (
    <div className={styles.headerInfoWrapper}>
      <div className={styles.left}>
        <NumberSign />
        <h4>Title of subchanel (maybe from context)</h4>
      </div>
      <div className={styles.right}>
        <Notification />
        <Pin />
        <UserManager />
        <OutlinedInput
          id="outlined-adornment-weight"
          endAdornment={<Search />}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            placeholder: "tim kiem",
          }}
        />
        <Mail />
        <Question />
      </div>
    </div>
  );
};

export default HeaderInfo;
