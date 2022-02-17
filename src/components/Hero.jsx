import React from "react";
import Image from "next/image";

import styles from "./Hero.module.scss";

const Hero = ({ image, children, width, height }) => (
  <div className={styles.hero}>
    <Image
      src={image}
      width={width}
      height={height}
      alt="banner image of out of focus trees"
    />
    <h2 className={styles.heroTitle}>{children}</h2>
  </div>
);

export default Hero;
