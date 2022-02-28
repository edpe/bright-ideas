import React from "react";
import styles from "./BookTitle.module.scss";
import Link from "next/link";

const Booktitle = ({ children, linkDestination }) => {
  return (
    <div className={styles.bookTitle}>
      {linkDestination ? (
        <Link href={`/${linkDestination}`} passHref>
          <a>{children}</a>
        </Link>
      ) : (
        <span>{children}</span>
      )}
    </div>
  );
};

export default Booktitle;
