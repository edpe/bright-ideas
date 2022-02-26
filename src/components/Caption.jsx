import React from "react";
import styles from "./Caption.module.scss";

const Caption = ({ children }) => (
  <div className={styles.caption}>{children}</div>
);

export default Caption;
