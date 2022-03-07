import React from "react";
import styles from "./Footer.module.scss";
import Separator from "./Separator";

interface FooterProps {
  children: React.ReactNode;
}

const Footer = (props: FooterProps) => {
  return (
    <>
      <footer role="contentinfo" className={styles.footer}>
        <Separator />

        <div>{props.children}</div>
        <p className={styles.copyright}>
          Copyright © 2022 Ed Perkins. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
