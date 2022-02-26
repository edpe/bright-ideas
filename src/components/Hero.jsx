import React from "react";
import Image from "next/image";

import Caption from "./Caption";
import styles from "./Hero.module.scss";

const Hero = ({ image, width, height, subtitle }) => {
  return (
    <div className={styles.hero}>
      <Image
        src={image}
        width={width}
        height={height}
        alt="banner image of out of focus trees"
      />
      <Caption>{subtitle}</Caption>
    </div>
  );
};

export default Hero;
