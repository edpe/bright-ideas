import React from "react";
import styles from "./Content.module.scss";

const Content = ({ children, noScroll }) => (
  <main className={styles.content}>{children}</main>
);

export default Content;
