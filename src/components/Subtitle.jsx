import React from "react";
import styles from "./Subtitle.module.scss";

const Subtitle = () => (
  <div className={styles.subtitle}>
    <h2 className={styles.title}>
      Little books of inspirational verse and prose
      <br />
    </h2>
    <p className={styles.author}>- P J Perkins</p>
  </div>
);

export default Subtitle;
