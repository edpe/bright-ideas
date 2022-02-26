import React from "react";
import styles from "./BookTitle.module.scss";
import Link from "next/link";

const Booktitle = ({ children, linkDestination }) => (
  <Link href={linkDestination} passHref>
    <div className={styles.bookTitle}>{children}</div>
  </Link>
);

export default Booktitle;
