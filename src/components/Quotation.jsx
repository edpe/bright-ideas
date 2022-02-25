import React from "react";
import styles from "./Quotation.module.scss";

const Quotation = ({ children, cite, author, source }) => (
  <div className={styles.quotation}>
    <blockquote className={styles.quote} cite={cite}>
      {children}
    </blockquote>
    <div className={styles.citation}>
      {source && <cite>{source}</cite>}
      {source && author && <span>{"-"}</span>}
      {author && <cite>{author}</cite>}
    </div>
  </div>
);

export default Quotation;
