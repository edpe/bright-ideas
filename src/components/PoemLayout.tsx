import React from "react";
import styles from "./PoemLayout.module.scss";

interface PoemLayoutProps {
  title: string;
  body: string;
}

const Poem = (props: PoemLayoutProps) => (
  <div className={styles.poem}>
    <div className={styles.title}>{props.title}</div>
    <div className={styles.body}>{props.body}</div>
  </div>
);

export default Poem;
