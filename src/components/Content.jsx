import React from "react";
import styles from "./Content.module.scss";

const Content = ({ children, noScroll }) => (
  <main
    style={noScroll ? { maxHeight: "100%" } : { maxHeight: "74vh" }}
    className={styles.content}
  >
    {children}
  </main>
);

export default Content;
