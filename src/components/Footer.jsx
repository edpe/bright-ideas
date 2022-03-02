import React from "react";
import styles from "./Footer.module.scss";

const Footer = ({ children, fullHeight }) => {
  return (
    <footer
      role="contentinfo"
      className={styles.footer}
      style={fullHeight ? { height: "100%" } : { height: undefined }}
    >
      <div>{children}</div>
      <p className={styles.copyright}>
        Copyright © 2022 Ed Perkins. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
