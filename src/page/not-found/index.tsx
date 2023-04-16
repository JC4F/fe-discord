import React from "react";
import styles from "./index.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Oops!</h1>
      <p className={styles.text}>
        We can't seem to find the page you're looking for.
      </p>
      <a href="/" className={styles.button}>
        Go back to home
      </a>
    </div>
  );
};

export default NotFound;
