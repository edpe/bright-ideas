import React from "react";
import styles from "./Poem.module.scss";

const Poem = ({ title, body }) => (
  <div className={styles.poem}>
    <div className={styles.title}>{title}</div>
    <div className={styles.body}>{body}</div>
  </div>
);

export default Poem;
