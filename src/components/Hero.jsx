import React from "react";
import Image from "next/image";

import Caption from "./Caption";
import styles from "./Hero.module.scss";

const Hero = ({ image, width, height, children }) => {
  return (
    <div className={styles.hero} style={{ height: height }}>
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
