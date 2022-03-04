import React from "react";

import Caption from "./Caption";
import styles from "./Hero.module.scss";

const Hero = ({ children }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroTitleWrapper}>
        <h2 className={styles.heroTitle}>
          Bright
          <br />
          Ideas.
        </h2>
      </div>
      <Caption>{children}</Caption>
    </div>
  );
};

export default Hero;
