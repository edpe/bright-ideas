import React from "react";
import styles from "./Content.module.scss";

interface ContentProps {
  children: React.ReactNode;
}

const Content = (props: ContentProps) => (
  <main className={styles.content}>{props.children}</main>
);

export default Content;
