import React from "react";
import Image from "next/image";
import heroImage from "../../public/images/heroImage.webp";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Image
        src={heroImage}
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        placeholder="blur"
      />
      <div className={styles.heroTitleWrapper}>
        <h2 className={styles.heroTitle}>
          Bright
          <br />
          Ideas.
        </h2>
      </div>

      <div className={styles.subtitleWrapper}>
        <h2 className={styles.subtitle}>
          Little books of inspirational verse and prose
        </h2>
        <p className={styles.author}>- P J Perkins</p>
      </div>
    </div>
  );
};

export default Hero;
