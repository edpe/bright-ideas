import React from "react";
import Image from "next/image";

import styles from "./Hero.module.scss";

const Hero = ({ image, width, height }) => (
  <div className={styles.hero}>
    <Image
      src={image}
      width={width}
      height={height}
      alt="banner image of out of focus trees"
    />
  </div>
);

export default Hero;
