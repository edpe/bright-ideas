import React from "react";
import styles from "./BookTitle.module.scss";
import Link from "next/link";

const Booktitle = ({ children, linkDestination }) => (
  <Link href={`/${linkDestination}`} passHref>
    <a className={styles.bookTitle}>{children}</a>
  </Link>
);

export default Booktitle;
