import React from "react";
import styles from "./Content.module.scss";

const Content = ({ children, noScroll }) => (
  <main
    style={noScroll ? { maxHheight: "100%" } : { maxHeight: "76vh" }}
    className={styles.content}
  >
    {children}
  </main>
);

export default Content;
