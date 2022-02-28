import React from "react";
import styles from "./Footer.module.scss";

const Footer = ({ children }) => {
  return (
    <footer role="contentinfo" className={styles.footer}>
      {children ? (
        <div>{children}</div>
      ) : (
        <p className={styles.copyright}>
          Copyright © 2022 Ed Perkins. All rights reserved.
        </p>
      )}
    </footer>
  );
};

export default Footer;
