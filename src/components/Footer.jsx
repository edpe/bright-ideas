import React from "react";
import styles from "./Footer.module.scss";

const Footer = ({ children }) => {
  return (
    <contentinfo className={styles.footer}>
      <div>{children}</div>
      <p className={styles.copyright}>
        Copyright © 2022 Ed Perkins. All rights reserved.
      </p>
    </contentinfo>
  );
};

export default Footer;
