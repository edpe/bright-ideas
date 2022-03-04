import React from "react";
import styles from "./Footer.module.scss";
import Separator from "./Separator";

const Footer = ({ children, fullHeight }) => {
  return (
    <>
      <footer role="contentinfo" className={styles.footer}>
        <Separator />

        <div>{children}</div>
        <p className={styles.copyright}>
          Copyright © 2022 Ed Perkins. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
